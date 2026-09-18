// backend/src/controllers/couponController.js
import Coupon from '../models/Coupon.js';

// @desc Create a new coupon (For Settings Tab)
export const createCoupon = async (req, res) => {
  try {
    const { gymId, code, discountType, discountValue, expiryDate } = req.body;
    const newCoupon = await Coupon.create({ gymId, code, discountType, discountValue, expiryDate });
    res.status(201).json({ success: true, data: newCoupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Validate and apply a coupon
export const validateCoupon = async (req, res) => {
  try {
    const { gymId, code } = req.body;
    
    // Find coupon by gymId and code
    const coupon = await Coupon.findOne({ gymId, code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid coupon code.' });
    }
    
    if (!coupon.isActive || new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({ success: false, message: 'This coupon has expired.' });
    }

    res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all coupons for a specific gym
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ gymId: req.query.gymId });
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a coupon
export const deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Coupon deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};