// backend/src/models/Gym.js
import mongoose from "mongoose";

const gymSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: "owner" },
    
    // Branding & Profile Fields
    gymName: { type: String, default: "" },
    gymLogo: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    termsAndConditions: { type: String, default: "" }
  },
  { 
    timestamps: true,
    strict: false
  }
);

const Gym = mongoose.model("Gym", gymSchema);
export default Gym; // ✅ This must export Gym, not User