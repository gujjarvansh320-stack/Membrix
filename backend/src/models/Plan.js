// backend/src/models/Plan.js
import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  gymId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    // e.g., "1 Month Basic", "Quarterly Pro"
  },
  durationInMonths: {
    type: Number,
    required: true,
    // e.g., 1, 3, 6, 12
  },
  price: {
    type: Number,
    required: true,
    // e.g., 1500, 4000
  }
}, { timestamps: true });

const Plan = mongoose.model('Plan', planSchema);

export default Plan;