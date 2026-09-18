import mongoose from 'mongoose';

const tempUploadSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  photoUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // Auto-deletes in 5 minutes
});

export default mongoose.model('TempUpload', tempUploadSchema);