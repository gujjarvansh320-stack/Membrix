// // backend/src/models/Member.js
// import mongoose from 'mongoose';

// const memberSchema = new mongoose.Schema({
//   gymId: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   mobile: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     trim: true,
//     default: '',
//   },
//   dob: {
//     type: Date,
//     default: null,
//   },
//   gender: {
//     type: String,
//     enum: ['Male', 'Female', 'Other', ''],
//     default: '',
//   },
//   address: {
//     type: String,
//     trim: true,
//     default: '',
//   },
//   aadharNumber: {
//     type: String,
//     trim: true,
//     default: '',
//   },
//   expiryDate: {
//     type: Date,
//     required: true,
//   },
//   photoUrl: {
//     type: String,
//     default: '',
//   },
//   planName: {
//     type: String,
//     default: 'Custom Plan'
//   },
//   lastPaymentType: {
//     type: String,
//     default: 'Registration'
//   },
//   pendingBalance: {
//     type: Number,
//     default: 0
//   },
//   pendingDueDate: {
//     type: Date,
//     default: null
//   },
//   // ✅ NEW FIELDS FOR TRAINER ASSIGNMENT & GOALS
//   assignedTrainer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     default: null
//   },
//   fitnessGoal: {
//     type: String,
//     default: 'General Fitness'
//   },
//   goalProgress: {
//     type: String,
//     default: '0%'
//   }
//   // 🚀 NEW FIELDS FOR BIOMETRIC ATTENDANCE
//   biometricId: { 
//     type: String, 
//     default: null 
//   },
//   biometricStatus: { 
//     type: String, 
//     enum: ['active', 'locked'], 
//     default: 'active' 
//   },
//   biometricSyncAction: { 
//     type: String, 
//     enum: ['none', 'enable', 'disable'], 
//     default: 'none' 
//   }
// }, { timestamps: true });

// const Member = mongoose.model('Member', memberSchema);

// export default Member;





import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
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
  dob: {
    type: Date,
    default: null,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', ''],
    default: '',
  },
  address: {
    type: String,
    trim: true,
    default: '',
  },
  aadharNumber: {
    type: String,
    trim: true,
    default: '',
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  photoUrl: {
    type: String,
    default: '',
  },
  planName: {
    type: String,
    default: 'Custom Plan'
  },
  lastPaymentType: {
    type: String,
    default: 'Registration'
  },
  pendingBalance: {
    type: Number,
    default: 0
  },
  pendingDueDate: {
    type: Date,
    default: null
  },
  assignedTrainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  fitnessGoal: {
    type: String,
    default: 'General Fitness'
  },
  goalProgress: {
    type: String,
    default: '0%'
  },
  // 🚀 NEW FIELDS FOR BIOMETRIC ATTENDANCE
  biometricId: { 
    type: String, 
    default: null 
  },
  biometricStatus: { 
    type: String, 
    enum: ['active', 'locked'], 
    default: 'active' 
  },
  biometricSyncAction: { 
    type: String, 
    enum: ['none', 'enable', 'disable'], 
    default: 'none' 
  }
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);

export default Member;