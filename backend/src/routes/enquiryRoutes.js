// backend/src/routes/enquiryRoutes.js
import express from 'express';
import { 
  getEnquiries, 
  createEnquiry, 
  updateEnquiry, 
  deleteEnquiry, 
  convertEnquiryToMember 
} from '../controllers/enquiryController.js';

const router = express.Router();

router.get('/', getEnquiries);
router.post('/', createEnquiry);
router.put('/:id', updateEnquiry);
router.delete('/:id', deleteEnquiry);
router.post('/:id/convert', convertEnquiryToMember);

export default router;