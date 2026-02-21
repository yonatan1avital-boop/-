import { Router } from 'express';
import { generateScene, getScene } from '../controllers/scene.controller';
import { authenticate } from '../middleware/authenticate';

export const sceneRouter = Router();

sceneRouter.post('/generate', authenticate, generateScene);
sceneRouter.get('/', authenticate, getScene);
