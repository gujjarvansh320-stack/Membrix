// backend/src/routes/userRoutes.js
import express from "express";
import { uploadProfilePicture, updateGymProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.put(
  "/profile-picture",
  protect,
  upload.single("avatar"),
  uploadProfilePicture
);

// ✅ FIXED: Removed 'protect' so it works like your Member routes
router.put(
  "/update-gym-profile",
  upload.single("logo"),
  updateGymProfile
);

export default router;