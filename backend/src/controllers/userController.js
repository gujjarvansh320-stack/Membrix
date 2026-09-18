// backend/src/controllers/userController.js
import User from "../models/User.js";
import { v2 as cloudinary } from 'cloudinary';

// 1. Upload User Profile Picture (For individual user avatars)
export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ 
        success: false, 
        message: "No image file uploaded" 
      });
    }

    const imageUrl = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, 
      { profilePicture: imageUrl },
      { new: true } 
    ).select("-password");

    res.status(200).json({ 
      success: true, 
      message: "Profile picture updated successfully", 
      data: updatedUser 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// 2. Update Gym Profile (Saves Branding, Address, Phone, & T&C into USER collection)
export const updateGymProfile = async (req, res) => {
  try {
    const { userId, gymName, phone, address, termsAndConditions } = req.body;
    
    // ✅ Map frontend data to the User database payload
    let updateData = {};
    if (gymName) updateData.gymName = gymName;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (termsAndConditions !== undefined) updateData.termsAndConditions = termsAndConditions;

    let targetUserId = null;

    if (userId && userId.length === 24 && userId !== '65abc123def4567890abcd12') {
      targetUserId = userId;
    } else {
      const firstUser = await User.findOne();
      if (firstUser) targetUserId = firstUser._id;
    }

    if (!targetUserId) {
      return res.status(404).json({ message: 'No users exist in the database yet to update.' });
    }

    // Handle Cloudinary Logo Replacement
    if (req.file) {
      updateData.gymLogo = req.file.path;

      const existingUser = await User.findById(targetUserId);
      if (existingUser && existingUser.gymLogo) {
        try {
          const urlParts = existingUser.gymLogo.split('/');
          const uploadIndex = urlParts.findIndex(part => part === 'upload');
          if (uploadIndex !== -1) {
            let publicIdParts = urlParts.slice(uploadIndex + 1);
            if (publicIdParts[0].startsWith('v')) publicIdParts.shift();
            const publicIdWithExt = publicIdParts.join('/');
            const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));
            await cloudinary.uploader.destroy(publicId);
          }
        } catch (cloudErr) {
          console.error("Error deleting old logo from Cloudinary:", cloudErr);
        }
      }
    }

    // ✅ Exclusively update the User collection
    const updatedUser = await User.findByIdAndUpdate(
      targetUserId, 
      updateData, 
      { new: true }
    ).select("-password");

    res.status(200).json({ 
      message: 'Profile updated successfully', 
      user: updatedUser 
    });

  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ 
      message: 'Error updating profile', 
      error: error.message 
    });
  }
};









