// import express from "express";
// import { register, login, createStaff, getStaff, updateStaff, deleteStaff } from "../controllers/authController.js";
// import { protect } from "../middleware/authMiddleware.js"; 

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.post("/create-staff", protect, createStaff);

// // Staff Management Routes
// router.get("/staff", protect, getStaff);
// router.put("/staff/:id", protect, updateStaff);
// router.delete("/staff/:id", protect, deleteStaff);

// export default router;








// import express from "express";
// import { register, login, createStaff, getStaff, updateStaff, deleteStaff } from "../controllers/authController.js";
// import { protect } from "../middleware/authMiddleware.js"; 
// import { upload } from "../middleware/uploadMiddleware.js"; // Import multer

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// // Inject upload.single('photo') to process the incoming image
// router.post("/create-staff", protect, upload.single('photo'), createStaff);

// // Staff Management Routes
// router.get("/staff", protect, getStaff);
// router.put("/staff/:id", protect, updateStaff);
// router.delete("/staff/:id", protect, deleteStaff);

// export default router;







import express from "express";
import { register, login, createStaff, getStaff, updateStaff, deleteStaff } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js"; 
import { upload } from "../middleware/uploadMiddleware.js"; 

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/create-staff", protect, upload.single('photo'), createStaff);

router.get("/staff", protect, getStaff);
// ✅ Inject upload middleware into the update route
router.put("/staff/:id", protect, upload.single('photo'), updateStaff);
router.delete("/staff/:id", protect, deleteStaff);

export default router;