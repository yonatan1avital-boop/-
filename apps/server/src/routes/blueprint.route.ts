import { Router } from 'express';
import { fetchBlueprint, saveBlueprint } from '../controllers/blueprint.controller';
import { authenticate } from '../middleware/authenticate';

export const blueprintRouter = Router();

blueprintRouter.get('/', authenticate, fetchBlueprint);
blueprintRouter.put('/', authenticate, saveBlueprint);
