// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "gym_saas/profile_pictures", // Creates this folder in Cloudinary
//     allowed_formats: ["jpg", "jpeg", "png", "webp"], // Only allow these images
//     transformation: [{ width: 500, height: 500, crop: "fill" }], // Auto-crop to square
//   },
// });

// export const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
// });







// backend/src/middleware/uploadMiddleware.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "gym_saas/profile_pictures", // Keeps your specific Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    
    // 🚀 THE MAGIC FIX: Crop to a 500x500 square AND apply AI file size compression
    transformation: [
      { width: 500, height: 500, crop: "fill" }, 
      { quality: "auto:good", fetch_format: "auto" } // Shrinks 10MB to ~50KB instantly
    ],
  },
});

export const upload = multer({
  storage,
  limits: { 
    // Increased to 15MB so heavy iPhone/Android photos are accepted by your Node server,
    // but Cloudinary will shrink them down before using up your storage quota.
    fileSize: 15 * 1024 * 1024 
  }, 
});