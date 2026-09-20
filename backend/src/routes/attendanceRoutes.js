import express from 'express';
import { logPunch } from '../controllers/attendanceController.js';

const router = express.Router();

// Route to receive live punches from the Python script
router.post('/log', logPunch);

export default router;