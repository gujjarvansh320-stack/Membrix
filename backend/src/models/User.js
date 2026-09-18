// // backend/src/models/User.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ["owner", "admin", "trainer"], default: "owner" },
//     isActive: { type: Boolean, default: true },
    
//     // ✅ NEW: Store the gym owner's subscription plan
//     plan: { type: String, enum: ["basic", "advance", "pro"], default: "basic" },
    
//     // Branding & Profile Fields
//     gymName: { type: String, default: "" },
//     gymLogo: { type: String, default: "" },
//     profilePicture: { type: String, default: "" },
//     phone: { type: String, default: "" },
//     address: { type: String, default: "" },
//     termsAndConditions: { type: String, default: "" } 
//   },
//   { 
//     timestamps: true,
//     strict: false 
//   }
// );

// const User = mongoose.model("User", userSchema);
// export default User;







// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     // ✅ ADDED: 'receptionist' to enum
//     role: { type: String, enum: ["owner", "admin", "trainer", "receptionist"], default: "owner" },
//     // ✅ ADDED: Permissions array for granular control
//     permissions: { type: [String], default: ["all"] }, 
//     isActive: { type: Boolean, default: true },
    
//     plan: { type: String, enum: ["basic", "advance", "pro"], default: "basic" },
    
//     gymName: { type: String, default: "" },
//     gymLogo: { type: String, default: "" },
//     profilePicture: { type: String, default: "" },
//     phone: { type: String, default: "" },
//     address: { type: String, default: "" },
//     termsAndConditions: { type: String, default: "" } 
//   },
//   { 
//     timestamps: true,
//     strict: false 
//   }
// );

// const User = mongoose.model("User", userSchema);
// export default User;






import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // ✅ ADDED: 'receptionist' to the enum
    role: { type: String, enum: ["owner", "admin", "trainer", "receptionist"], default: "owner" },
    // ✅ ADDED: Permissions array for granular feature control
    permissions: { type: [String], default: ["all"] }, 
    isActive: { type: Boolean, default: true },
    
    // Store the gym owner's subscription plan
    plan: { type: String, enum: ["basic", "advance", "pro"], default: "basic" },
    
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

const User = mongoose.model("User", userSchema);
export default User;