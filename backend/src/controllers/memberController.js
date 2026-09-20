// backend/src/controllers/memberController.js
import Member from '../models/Member.js';
import Payment from '../models/Payment.js';
import Coupon from '../models/Coupon.js'; 
import Enquiry from '../models/Enquiry.js';
import mongoose from 'mongoose'; 
import { v2 as cloudinary } from 'cloudinary';

// Temporary in-memory store for phone sync
const tempPhotoStore = new Map();

const calculateDiscount = async (gymId, couponCode, basePrice) => {
  if (!couponCode || !basePrice || basePrice <= 0) return 0;
  try {
    const coupon = await Coupon.findOne({ 
      gymId, 
      code: couponCode.toUpperCase().trim(),
      isActive: true 
    });

    if (!coupon) return 0;

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (Number(basePrice) * Number(coupon.discountValue)) / 100;
    } else {
      discount = Number(coupon.discountValue);
    }
    return Math.min(discount, Number(basePrice));
  } catch (err) {
    return 0;
  }
};

export const registerMember = async (req, res) => {
  try {
    const { 
      gymId, name, mobile, email, dob, gender, address, 
      aadharNumber, expiryDate, amountPaid, couponCode, planName, 
      discountAmount: frontendDiscount,
      paymentMode, pendingBalance, pendingDueDate // 👈 Fixed Database Save Logic
    } = req.body;
    
    const finalPhotoUrl = req.file ? req.file.path : (req.body.photoUrl || '');

    const newMember = await Member.create({ 
      gymId, name, mobile, email, dob: dob ? new Date(dob) : null, gender, address, 
      aadharNumber, expiryDate, 
      photoUrl: finalPhotoUrl, 
      planName,
      lastPaymentType: 'Registration',
      pendingBalance: Number(pendingBalance) || 0, // 👈 Saved to Member DB
      pendingDueDate: (Number(pendingBalance) > 0 && pendingDueDate) ? new Date(pendingDueDate) : null 
    });
    
    // Create payment record if they paid something OR if they owe something
    if ((amountPaid && Number(amountPaid) > 0) || (pendingBalance && Number(pendingBalance) > 0)) {
      let finalDiscount = Number(frontendDiscount) || 0;
      if (!finalDiscount && couponCode) {
        finalDiscount = await calculateDiscount(gymId, couponCode, Number(amountPaid) + finalDiscount);
      }

      await Payment.create({
        gymId, 
        memberId: newMember._id, 
        amount: Number(amountPaid) || 0, 
        discountAmount: finalDiscount, 
        paymentType: 'Registration',
        couponCode: couponCode || '',
        planName: planName || 'Custom Plan',
        paymentMode: paymentMode || 'Cash', // 👈 Saved to Payment DB (Fixes the UPI bug)
        pendingBalance: Number(pendingBalance) || 0, // 👈 Saved to Payment DB
        pendingDueDate: (Number(pendingBalance) > 0 && pendingDueDate) ? new Date(pendingDueDate) : null
      });
    }

    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: 'Error registering member', error: error.message });
  }
};

export const getActiveMembers = async (req, res) => {
  try {
    const { gymId, search, status } = req.query;
    const currentDate = new Date();

    let query = { gymId };

    if (req.user && req.user.role && req.user.role.toLowerCase() === 'trainer') {
      query.assignedTrainer = req.user._id;
    }

    if (status === 'expired') {
      query.expiryDate = { $lt: currentDate };
    } else if (status === 'active') {
      query.expiryDate = { $gte: currentDate };
    } else if (status === 'expiring_soon' || status === 'Expiring Soon') {
      // (Ensure this string matches exactly what your frontend tab sends in the API call)
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(currentDate.getDate() + 7);
      
      query.expiryDate = { 
        $gte: currentDate,       // Must not be expired yet
        $lte: sevenDaysFromNow   // Must expire within the next 7 days
      };
    }
    if (search) {
      query.$or = [
        { name: { $regex: search,$options: 'i' } },
        { mobile: { $regex: search,$options: 'i' } }
      ];
    }

    const members = await Member.find(query)
      .populate('assignedTrainer', 'name')
      .sort({ expiryDate: 1 });
      
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members', error: error.message });
  }
};

export const getMemberStats = async (req, res) => {
  try {
    const { gymId, filter = 'this_month', startDate, endDate } = req.query;
    const currentDate = new Date();

    let start = new Date(0); 
    let end = new Date();
    end.setHours(23, 59, 59, 999);

    if (filter === 'today') {
      start = new Date();
      start.setHours(0, 0, 0, 0);
    } else if (filter === 'this_month') {
      start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      start.setHours(0, 0, 0, 0);
    } else if (filter === 'last_month') {
      start = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      start.setHours(0, 0, 0, 0);
      end = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0, 23, 59, 59, 999);
    } else if (filter === 'custom' && startDate && endDate) {
      start = new Date(startDate); 
      start.setHours(0, 0, 0, 0);
      end = new Date(endDate); 
      end.setHours(23, 59, 59, 999);
    } else if (filter === 'all_time') {
      start = new Date(2020, 0, 1); 
    }

    const activeClientsCount = await Member.countDocuments({ gymId, expiryDate: { $gte: currentDate } });
    const inactiveClientsCount = await Member.countDocuments({ gymId, expiryDate: { $lt: currentDate } });
    const totalClientsCount = activeClientsCount + inactiveClientsCount;

    const paymentsInRange = await Payment.find({ gymId, paymentDate: { $gte: start,$lte: end } });
    
    const salesCollected = paymentsInRange.reduce((acc, p) => acc + (p.amount || 0), 0);
    const newClientsCount = paymentsInRange.filter(p => p.paymentType === 'Registration').length;
    const renewalsCount = paymentsInRange.filter(p => p.paymentType === 'Renewal').length;
    const pendingPayments = paymentsInRange.reduce((acc, p) => acc + (Number(p.pendingBalance) || 0), 0);

    const chartMap = {};

    paymentsInRange.forEach(payment => {
      const d = new Date(payment.paymentDate);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      
      const sortKey = `${year}-${month}-${day}`;
      
      if (!chartMap[sortKey]) {
        chartMap[sortKey] = {
          date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
          revenue: 0,
          rawDate: d.getTime()
        };
      }
      chartMap[sortKey].revenue += (payment.amount || 0);
    });

    const chartData = Object.values(chartMap)
      .sort((a, b) => a.rawDate - b.rawDate)
      .map(item => ({ date: item.date, revenue: item.revenue }));

    res.status(200).json({
      activeClients: activeClientsCount, 
      inactiveClients: inactiveClientsCount, 
      totalClients: totalClientsCount,
      salesCollected, 
      pendingPayments, 
      newClients: newClientsCount, 
      renewals: renewalsCount, 
      chartData 
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};

export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // 🚀 FIX 1: Prevent MongoDB crash for modifying immutable fields
    delete updateData._id;
    delete updateData.gymId;

    // 🚀 FIX 2: Prevent CastErrors for empty strings sent by FormData
    if (!updateData.dob || updateData.dob === 'null' || updateData.dob === 'undefined') {
      updateData.dob = null;
    }
    if (!updateData.assignedTrainer || updateData.assignedTrainer === '' || updateData.assignedTrainer === 'null') {
      updateData.assignedTrainer = null;
    }
    if (updateData.pendingBalance === '') {
      updateData.pendingBalance = 0;
    }

    if (req.file) {
      updateData.photoUrl = req.file.path;
      const existingMember = await Member.findById(id);
      if (existingMember && existingMember.photoUrl) {
        try {
          const urlParts = existingMember.photoUrl.split('/');
          const uploadIndex = urlParts.findIndex(part => part === 'upload');
          if (uploadIndex !== -1) {
            let publicIdParts = urlParts.slice(uploadIndex + 1);
            if (publicIdParts[0].startsWith('v')) publicIdParts.shift();
            const publicIdWithExt = publicIdParts.join('/');
            const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));
            await cloudinary.uploader.destroy(publicId);
          }
        } catch (cloudErr) {
          console.warn("Could not delete old photo from Cloudinary:", cloudErr);
        }
      }
    }

    const updatedMember = await Member.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedMember) return res.status(404).json({ message: 'Member not found' });
    
    res.status(200).json(updatedMember);
  } catch (error) {
    console.error("Update Member Error:", error);
    res.status(500).json({ message: 'Error updating member', error: error.message });
  }
};

export const renewMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      newExpiryDate, amountPaid, couponCode, planName, discountAmount: frontendDiscount, pendingBalance, 
      pendingDueDate,
      paymentMode 
    } = req.body;

    const member = await Member.findById(id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    
    const newTotalDebt = (member.pendingBalance || 0) + (Number(pendingBalance) || 0);

    const updatedMember = await Member.findByIdAndUpdate(
      id, 
      { 
        expiryDate: newExpiryDate, planName: planName || 'Custom Plan', lastPaymentType: 'Renewal', pendingBalance: newTotalDebt,
        pendingDueDate: (Number(pendingBalance) > 0 && pendingDueDate) ? new Date(pendingDueDate) : member.pendingDueDate,
        // 🚀 ADDED: Instantly unlock on the biometric machine
        biometricStatus: 'active',
        biometricSyncAction: 'enable'
      }, 
      { new: true }
    );

    if (amountPaid && Number(amountPaid) > 0) {
      let finalDiscount = Number(frontendDiscount) || 0;
      if (!finalDiscount && couponCode) {
        finalDiscount = await calculateDiscount(updatedMember.gymId, couponCode, Number(amountPaid) + finalDiscount);
      }

      await Payment.create({
        gymId: updatedMember.gymId, 
        memberId: updatedMember._id, 
        amount: Number(amountPaid), 
        discountAmount: finalDiscount, 
        pendingBalance: newTotalDebt,
        pendingDueDate: (Number(pendingBalance) > 0 && pendingDueDate) ? new Date(pendingDueDate) : null,
        paymentType: 'Renewal',
        couponCode: couponCode || '',
        planName: planName || 'Custom Plan',
        paymentMode: paymentMode || 'Cash' 
      });
    }

    res.status(200).json({ message: 'Member renewed successfully', member: updatedMember });
  } catch (error) {
    res.status(500).json({ message: 'Error renewing member', error: error.message });
  }
};

export const clearDues = async (req, res) => {
  try {
    const { id } = req.params; 
    const { amountPaid, paymentMode } = req.body;

    const paymentAmount = Number(amountPaid);
    if (!paymentAmount || paymentAmount <= 0) {
      return res.status(400).json({ message: 'Please enter a valid payment amount' });
    }

    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    let currentDebt = Number(member.pendingBalance) || 0;

    if (currentDebt === 0) {
      const latestPayment = await Payment.findOne({ memberId: member._id }).sort({ paymentDate: -1 });
      if (latestPayment && Number(latestPayment.pendingBalance) > 0) {
        currentDebt = Number(latestPayment.pendingBalance);
      }
    }

    if (paymentAmount > currentDebt) {
      return res.status(400).json({ message: `Payment amount cannot exceed the pending due balance of ₹${currentDebt}` });
    }

    const newPendingBalance = Math.max(0, currentDebt - paymentAmount);
    
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      {
        pendingBalance: newPendingBalance,
        pendingDueDate: newPendingBalance === 0 ? null : member.pendingDueDate
      },
      { new: true }
    );

    await Payment.updateMany(
      { memberId: member._id, pendingBalance: { $gt: 0 } },       {$set: { pendingBalance: newPendingBalance } }
    );

    const newPayment = await Payment.create({
      gymId: member.gymId,
      memberId: member._id,
      amount: paymentAmount,
      discountAmount: 0,
      pendingBalance: newPendingBalance,
      pendingDueDate: newPendingBalance === 0 ? null : member.pendingDueDate,
      paymentType: 'Due Clearance',
      paymentMode: paymentMode || 'Cash',
      planName: member.planName || 'Custom Plan'
    });

    res.status(200).json({
      message: 'Dues cleared successfully',
      member: updatedMember,
      payment: newPayment
    });
  } catch (error) {
    console.error('Error clearing dues:', error);
    res.status(500).json({ message: 'Error clearing dues', error: error.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);
    if (!member) return res.status(404).json({ message: 'Member not found' });

    if (member.photoUrl) {
      try {
        const urlParts = member.photoUrl.split('/');
        const uploadIndex = urlParts.findIndex(part => part === 'upload');
        if (uploadIndex !== -1) {
          let publicIdParts = urlParts.slice(uploadIndex + 1);
          if (publicIdParts[0].startsWith('v')) publicIdParts.shift();
          const publicIdWithExt = publicIdParts.join('/');
          const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (cloudErr) {}
    }

    await Member.findByIdAndDelete(id);
    await Payment.deleteMany({ memberId: id });
    res.status(200).json({ message: 'Member and photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member', error: error.message });
  }
};

export const getMemberPayments = async (req, res) => {
  try {
    const { id } = req.params;
    const payments = await Payment.find({ memberId: id }).sort({ paymentDate: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment history', error: error.message });
  }
};

// export const getAllPayments = async (req, res) => {
//   try {
//     const { gymId } = req.query;
//     const payments = await Payment.find({ gymId })
//       .populate('memberId', 'name mobile email planName expiryDate pendingBalance pendingDueDate') 
//       .sort({ paymentDate: -1 });
//     res.status(200).json(payments);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching payments', error: error.message });
//   }
// };

export const getAllPayments = async (req, res) => {
  try {
    const { gymId } = req.query;
    const payments = await Payment.find({ gymId })
      // ✅ ADDED 'email' HERE
      .populate('memberId', 'name mobile email planName expiryDate pendingBalance pendingDueDate') 
      .sort({ paymentDate: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error: error.message });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await Payment.findByIdAndDelete(id);
    if (!deletedPayment) return res.status(404).json({ message: 'Payment record not found' });
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment', error: error.message });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, paymentType, paymentMode } = req.body; 
    
    const updatedPayment = await Payment.findByIdAndUpdate(
      id, { amount: Number(amount), paymentType, paymentMode }, { new: true }
    );
    
    if (!updatedPayment) return res.status(404).json({ message: 'Payment record not found' });
    res.status(200).json({ message: 'Payment updated successfully', updatedPayment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment', error: error.message });
  }
};

export const transferMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const { newName, newMobile, transferFee, paymentMode } = req.body;

    const member = await Member.findById(id);
    if (!member) return res.status(404).json({ message: 'Member not found' });

    const updatedMember = await Member.findByIdAndUpdate(
      id,
      {
        name: newName,
        mobile: newMobile,
        email: '',
        photoUrl: '',
        aadharNumber: '',
        dob: null,
        lastPaymentType: 'Transfer'
      },
      { new: true }
    );

    if (transferFee && Number(transferFee) > 0) {
      await Payment.create({
        gymId: member.gymId,
        memberId: member._id,
        amount: Number(transferFee),
        discountAmount: 0,
        pendingBalance: member.pendingBalance || 0,
        paymentType: 'Renewal', 
        paymentMode: paymentMode || 'Cash',
        planName: 'Membership Transfer'
      });
    }

    res.status(200).json({ message: 'Membership transferred successfully', member: updatedMember });
  } catch (error) {
    res.status(500).json({ message: 'Error transferring membership: ' + error.message });
  }
};

export const getFollowUps = async (req, res) => {
  try {
    const { gymId } = req.query;
    
    const userRole = req.user?.role?.toLowerCase();
    const userId = req.user?._id;

    const currentDate = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(currentDate.getDate() + 7);

    let baseQuery = { gymId };
    
    if (userRole === 'trainer') {
      baseQuery.assignedTrainer = userId;
    }

    const expiringMembers = await Member.find({
      ...baseQuery,
      expiryDate: { $lte: sevenDaysFromNow }
    }).populate('assignedTrainer', 'name');

    const pendingDues = await Member.find({
      ...baseQuery,
      pendingBalance: { $gt: 0 }
    }).populate('assignedTrainer', 'name');

    const enquiries = await Enquiry.find({
      gymId,
      status: { $in: ['Pending', 'Trial'] } 
    });

    res.status(200).json({ expiringMembers, pendingDues, enquiries });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching follow-ups', error: error.message });
  }
};

// ==========================================
// NEW ENDPOINTS: Phone Photo Sync Handlers
// ==========================================
export const uploadTempPhoto = async (req, res) => {
  try {
    const { sessionId } = req.params;
    if (!req.file) {
      return res.status(400).json({ message: "No photo uploaded" });
    }
    
    tempPhotoStore.set(sessionId, req.file.path);
    
    setTimeout(() => tempPhotoStore.delete(sessionId), 10 * 60 * 1000);

    res.status(200).json({ message: "Photo uploaded successfully", photoUrl: req.file.path });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload temp photo", error: error.message });
  }
};

export const checkTempPhoto = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const photoUrl = tempPhotoStore.get(sessionId);

    if (photoUrl) {
      return res.status(200).json({ uploaded: true, photoUrl });
    } else {
      return res.status(404).json({ uploaded: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error checking temp photo status", error: error.message });
  }
};

// ==========================================
// BIOMETRIC HARDWARE SYNC ENDPOINTS
// ==========================================

export const getBiometricSyncQueue = async (req, res) => {
  try {
    const { gymId } = req.query;
    
    // Find members flagged for enable/disable who actually have a fingerprint ID
    const pendingSyncs = await Member.find({ 
      gymId, 
      biometricSyncAction: { $in: ['enable', 'disable'] },
      biometricId: { $ne: null } 
    }).select('biometricId biometricSyncAction name');

    res.status(200).json(pendingSyncs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sync queue', error: error.message });
  }
};

export const clearBiometricSyncStatus = async (req, res) => {
  try {
    const { gymId, memberIds } = req.body; 
    // memberIds should be an array of the MongoDB _ids that were successfully synced

    if (!memberIds || !memberIds.length) {
      return res.status(400).json({ message: 'No members provided' });
    }

    await Member.updateMany(
      { _id: { $in: memberIds }, gymId },
      { $set: { biometricSyncAction: 'none' } } // Clear them from the queue
    );

    res.status(200).json({ message: 'Sync queue cleared for processed members' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating sync status', error: error.message });
  }
};