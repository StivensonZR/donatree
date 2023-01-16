

import { Router } from 'express';
import stripe from '../controllers/pagoController.js';

const router = Router();


router.post('/create-checkout-session', stripe.pago);
router.get('/confirmar_pago', stripe.confirmar_pago);






export default router;

