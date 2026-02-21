import { Response } from 'express';
import { z } from 'zod';
import { AuthenticatedRequest } from '../middleware/authenticate';
import { chatWithEve } from '../services/ai/eve.service';

const schema = z.object({
  mode: z.enum(['motivator', 'strategic_advisor', 'emotional_regulator']),
  prompt: z.string().min(1)
});

export async function eveChat(req: AuthenticatedRequest, res: Response) {
  const payload = schema.parse(req.body);
  const result = await chatWithEve(req.user!.sub, payload.mode, payload.prompt);
  return res.status(200).json(result);
}
