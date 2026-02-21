import { Router } from 'express';
import { adminMetrics, adminSetSubscription, me } from '../controllers/user.controller';
import { authenticate, requireAdmin } from '../middleware/authenticate';

export const userRouter = Router();

userRouter.get('/me', authenticate, me);
userRouter.patch('/admin/subscription', authenticate, requireAdmin, adminSetSubscription);
userRouter.get('/admin/metrics', authenticate, requireAdmin, adminMetrics);
