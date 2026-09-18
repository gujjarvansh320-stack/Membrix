// backend/src/models/Enquiry.js
import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  gymId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    default: '',
  },
  goal: {
    type: String, // e.g., Weight Loss, Muscle Gain, General Fitness
    default: 'General Fitness',
  },
  status: {
    type: String,
    enum: ['Pending', 'Trial', 'Converted', 'Dropped'],
    default: 'Pending',
  },
  trialDate: {
    type: Date,
    default: null,
  },
  notes: {
    type: String,
    default: '',
  }
}, { timestamps: true });

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;