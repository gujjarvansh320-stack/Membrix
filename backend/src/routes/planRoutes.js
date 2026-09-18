// backend/src/routes/planRoutes.js
import express from 'express';
import { createPlan, getPlans, deletePlan , deletePayment , updatePayment } from '../controllers/planController.js';

const router = express.Router();

router.post('/', createPlan);
router.get('/', getPlans);
router.delete('/:id', deletePlan);

router.delete('/payments/:id', deletePayment);
router.put('/payments/:id', updatePayment);

export default router;