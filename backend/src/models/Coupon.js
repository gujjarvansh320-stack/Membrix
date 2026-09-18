// backend/src/models/Coupon.js
import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  gymId: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    uppercase: true, // Forces codes like "summer10" to save as "SUMMER10"
    trim: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'], // E.g., 10% off vs ₹500 off
    required: true,
  },
  discountValue: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

export default mongoose.model('Coupon', couponSchema);