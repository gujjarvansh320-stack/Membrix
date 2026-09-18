import express from "express";
import { createGym, getMyGym, updateGym } from "../controllers/gymController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All gym routes require the user to be logged in
router.use(protect);

router.post("/", createGym);
router.get("/my-gym", getMyGym);
router.put("/my-gym", updateGym);

export default router;