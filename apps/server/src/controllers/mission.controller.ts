import { Response } from 'express';
import { z } from 'zod';
import { AuthenticatedRequest } from '../middleware/authenticate';
import { completeMission, ensureMissionTrack, getMissionProgress } from '../services/missions/mission.service';

export async function initMissionTrack(req: AuthenticatedRequest, res: Response) {
  await ensureMissionTrack(req.user!.sub);
  const progress = await getMissionProgress(req.user!.sub);
  return res.status(200).json(progress);
}

export async function completeMissionDay(req: AuthenticatedRequest, res: Response) {
  const { day } = z.object({ day: z.number().min(1).max(30) }).parse(req.body);
  const mission = await completeMission(req.user!.sub, day);
  return res.status(200).json(mission);
}

export async function missionProgress(req: AuthenticatedRequest, res: Response) {
  const progress = await getMissionProgress(req.user!.sub);
  return res.status(200).json(progress);
}
