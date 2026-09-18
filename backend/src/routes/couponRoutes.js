// backend/src/routes/couponRoutes.js
import express from 'express';
import { createCoupon, validateCoupon , getCoupons ,  deleteCoupon} from '../controllers/couponController.js';

const router = express.Router();

router.post('/create', createCoupon);
router.post('/validate', validateCoupon);

router.get('/', getCoupons)

router.delete('/:id', deleteCoupon)

export default router;