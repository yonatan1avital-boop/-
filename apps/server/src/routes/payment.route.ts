import { Router } from 'express';
import express from 'express';
import { checkout, stripeWebhook } from '../controllers/payment.controller';
import { authenticate } from '../middleware/authenticate';

export const paymentRouter = Router();

paymentRouter.post('/checkout', authenticate, checkout);
paymentRouter.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);
