import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authenticate';
import { getBlueprint, upsertBlueprint } from '../services/blueprint/blueprint.service';

export async function saveBlueprint(req: AuthenticatedRequest, res: Response) {
  const blueprint = await upsertBlueprint(req.user!.sub, req.body);
  return res.status(200).json(blueprint);
}

export async function fetchBlueprint(req: AuthenticatedRequest, res: Response) {
  const blueprint = await getBlueprint(req.user!.sub);
  return res.status(200).json(blueprint);
}
