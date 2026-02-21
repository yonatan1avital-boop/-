import { Router } from 'express';
import { completeMissionDay, initMissionTrack, missionProgress } from '../controllers/mission.controller';
import { authenticate } from '../middleware/authenticate';

export const missionRouter = Router();

missionRouter.post('/init', authenticate, initMissionTrack);
missionRouter.post('/complete', authenticate, completeMissionDay);
missionRouter.get('/progress', authenticate, missionProgress);
