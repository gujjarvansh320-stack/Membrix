import { createUser, loginUser } from "../services/authService.js";
import User from "../models/User.js"; 
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role, gymId, plan, permissions, orgType } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: "Required fields missing" });

    // 1. Create base user (authService will likely drop orgType here)
    const user = await createUser({ name, email, password, phone, role, gymId, plan });
    
    // 2. ✅ FORCE SAVE permissions and orgType directly to MongoDB
    const finalPermissions = permissions || ['all'];
    const finalOrgType = orgType || 'gym';
    
    await User.findByIdAndUpdate(
      user._id, 
      { 
        permissions: finalPermissions,
        orgType: finalOrgType // 👈 Explicitly forces MongoDB to save the business type
      }
    );

    const token = generateToken(user._id);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: {
          id: user._id, _id: user._id, name: user.name, email: user.email,
          role: user.role, gymId: user.gymId, gymName: user.gymName || 'Gym SaaS',
          gymLogo: user.gymLogo || '', phone: user.phone || '', plan: user.plan || 'basic',
          address: user.address || '', termsAndConditions: user.termsAndConditions || '',
          permissions: finalPermissions,
          orgType: finalOrgType // 👈 Injects into local storage for immediate routing
        },
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });

    const { user, token } = await loginUser(email, password);

    let displayGymName = user.gymName || 'Gym SaaS';
    let displayGymLogo = user.gymLogo || '';
    let displayPhone = user.phone || '';
    let displayAddress = user.address || '';
    let displayTerms = user.termsAndConditions || '';
    
    if (user.role !== 'owner') {
      const ownerUser = await User.findById(user.gymId);
      if (ownerUser) {
        displayGymName = ownerUser.gymName || 'Gym SaaS';
        displayGymLogo = ownerUser.gymLogo || '';
        displayPhone = ownerUser.phone || '';
        displayAddress = ownerUser.address || '';
        displayTerms = ownerUser.termsAndConditions || '';
      }
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id, _id: user._id, name: user.name, email: user.email,
          role: user.role, gymId: user.gymId, 
          gymName: displayGymName, 
          gymLogo: displayGymLogo, 
          phone: displayPhone, 
          address: displayAddress,
          termsAndConditions: displayTerms,
          plan: user.plan || 'basic',
          permissions: user.permissions && user.permissions.length > 0 ? user.permissions : (user.role === 'owner' ? ['all'] : []),
          photo: user.photo || '',
          orgType: user.orgType || 'gym' // ✅ INJECT INTO ROUTER
        },
      },
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const createStaff = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    let { permissions } = req.body;
    const gymId = req.user?.gymId || req.user?._id;
    
    const photo = req.file ? req.file.path : ''; 

    if (!name || !email || !password) return res.status(400).json({ success: false, message: "Required fields missing" });

    if (typeof permissions === 'string') {
      try {
        permissions = JSON.parse(permissions);
      } catch (e) {
        permissions = [];
      }
    }

    const staff = await createUser({ name, email, password, phone, role, gymId });
    
    const finalPermissions = permissions && permissions.length > 0 ? permissions : [];
    const updatedStaff = await User.findByIdAndUpdate(
      staff._id, 
      { 
        permissions: finalPermissions, 
        gymId: gymId,
        photo: photo 
      }, 
      { new: true }
    );

    res.status(201).json({ success: true, message: "Staff account created successfully", data: updatedStaff });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getStaff = async (req, res) => {
  try {
    const queryGymId = req.query.gymId;
    const authGymId = req.user?.gymId || req.user?._id || req.user?.id;
    const targetGymId = (!queryGymId || queryGymId === '65abc123def4567890abcd12') ? authGymId : queryGymId;

    const staff = await User.find({
      role: { $ne: 'owner' },
      $or: [
        { gymId: targetGymId },
        { gymId: authGymId },
        ...(targetGymId ? [{ gymId: String(targetGymId) }, { gymId: targetGymId }] : [])
      ]
    }).select('-password');

    const uniqueStaff = Array.from(new Map(staff.map(item => [item._id.toString(), item])).values());
    res.status(200).json(uniqueStaff);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role } = req.body;
    let { permissions } = req.body;
    
    const photo = req.file ? req.file.path : undefined; 

    if (typeof permissions === 'string') {
      try {
        permissions = JSON.parse(permissions);
      } catch (e) {
        permissions = [];
      }
    }
    
    const finalPermissions = permissions && permissions.length > 0 ? permissions : [];
    
    const updateData = { name, email, phone, role, permissions: finalPermissions };
    if (photo !== undefined) {
      updateData.photo = photo; 
    }

    const updatedStaff = await User.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    ).select('-password');

    res.status(200).json({ success: true, data: updatedStaff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};