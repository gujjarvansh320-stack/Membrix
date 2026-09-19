// backend/src/routes/memberRoutes.js
import express from 'express';
import { 
  registerMember, getActiveMembers, getMemberStats, 
  renewMember, deleteMember, updateMember, 
  getMemberPayments, getAllPayments, 
  updatePayment, deletePayment, 
  transferMembership, 
  getFollowUps,
  clearDues,
  checkTempPhoto, // 👈 Added for phone photo sync
  uploadTempPhoto // 👈 Added for phone photo sync
} from '../controllers/memberController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// ==========================================
// 1. GLOBAL ROUTES (No ID parameters)
// ==========================================
router.get('/stats', getMemberStats);
router.get('/payments/all', getAllPayments);
router.get('/follow-ups', getFollowUps);
router.get('/active', getActiveMembers);
router.post('/register', upload.single('photo'), registerMember);

// ✅ Added Routes to handle the Phone Camera Sync (Fixes the 404 Polling Error)
router.get('/temp-photo/:sessionId', checkTempPhoto);
router.post('/temp-photo/:sessionId', upload.single('photo'), uploadTempPhoto);

// ==========================================
// 2. PAYMENT SPECIFIC ROUTES
// ==========================================
router.put('/payments/:id', updatePayment);
router.delete('/payments/:id', deletePayment);

// ==========================================
// 3. MEMBER SUB-ROUTES (Must be above /:id)
// ==========================================
router.put('/:id/renew', renewMember);
router.put('/:id/transfer', transferMembership);
router.put('/:id/clear-dues', clearDues); 
router.get('/:id/payments', getMemberPayments);

// ==========================================
// 4. GENERIC MEMBER ROUTES (Wildcards at bottom)
// ==========================================
router.put('/:id', upload.single('photo'), updateMember);
router.delete('/:id', deleteMember);

export default router;