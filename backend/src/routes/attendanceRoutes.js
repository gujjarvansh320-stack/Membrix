import express from 'express';
import { logPunch, getAttendanceLogs } from '../controllers/attendanceController.js';

const router = express.Router();

// Route to receive live punches from the Python script
router.post('/log', logPunch);

// Route to send today's logs to the React Dashboard
router.get('/logs', getAttendanceLogs);

export default router;