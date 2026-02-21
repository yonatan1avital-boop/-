import { Router } from 'express';
import { notify } from '../controllers/notification.controller';
import { authenticate } from '../middleware/authenticate';

export const notificationRouter = Router();

notificationRouter.post('/', authenticate, notify);
