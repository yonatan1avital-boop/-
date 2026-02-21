import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authenticate';
import { BlueprintModel } from '../models/blueprint.model';
import { SceneConfigModel } from '../models/scene-config.model';
import { generateSceneFromBlueprint } from '../services/scene/scene.service';

export async function generateScene(req: AuthenticatedRequest, res: Response) {
  const blueprint = await BlueprintModel.findOne({ userId: req.user!.sub });
  if (!blueprint) {
    return res.status(400).json({ message: 'Blueprint required before scene generation' });
  }

  const config = await generateSceneFromBlueprint(req.user!.sub, blueprint);
  return res.status(200).json(config);
}

export async function getScene(req: AuthenticatedRequest, res: Response) {
  const config = await SceneConfigModel.findOne({ userId: req.user!.sub });
  return res.status(200).json(config);
}
