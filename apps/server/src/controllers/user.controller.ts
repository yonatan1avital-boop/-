import { Response } from 'express';
import { z } from 'zod';
import { AuthenticatedRequest } from '../middleware/authenticate';
import { getAdminUsageMetrics, getUserProfile, setSubscriptionTier } from '../services/users/user.service';

export async function me(req: AuthenticatedRequest, res: Response) {
  const profile = await getUserProfile(req.user!.sub);
  return res.status(200).json(profile);
}

export async function adminSetSubscription(req: AuthenticatedRequest, res: Response) {
  const { userId, tier } = z.object({ userId: z.string(), tier: z.enum(['FREE', 'PRO', 'ELITE']) }).parse(req.body);
  const updated = await setSubscriptionTier(userId, tier);
  return res.status(200).json(updated);
}

export async function adminMetrics(_req: AuthenticatedRequest, res: Response) {
  const metrics = await getAdminUsageMetrics();
  return res.status(200).json(metrics);
}
