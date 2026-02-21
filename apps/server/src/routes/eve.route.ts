import { Router } from 'express';
import { eveChat } from '../controllers/eve.controller';
import { authenticate } from '../middleware/authenticate';

export const eveRouter = Router();

eveRouter.post('/chat', authenticate, eveChat);
