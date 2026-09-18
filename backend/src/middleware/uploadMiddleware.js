import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "gym_saas/profile_pictures", // Creates this folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // Only allow these images
    transformation: [{ width: 500, height: 500, crop: "fill" }], // Auto-crop to square
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // Limit file size to 3MB
});