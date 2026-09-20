import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  gymId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  memberId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Member', 
    required: true 
  },
  biometricId: { 
    type: String, 
    required: true 
  },
  punchTime: { 
    type: Date, 
    required: true,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Attendance', attendanceSchema);