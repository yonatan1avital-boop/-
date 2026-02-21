import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthenticatedRequest } from '../middleware/authenticate';
import { createCheckoutSession, handleSubscriptionWebhook, stripe } from '../services/payments/stripe.service';
import { env } from '../config/env';

export async function checkout(req: AuthenticatedRequest, res: Response) {
  const { tier } = z.object({ tier: z.enum(['PRO', 'ELITE']) }).parse(req.body);
  const session = await createCheckoutSession(req.user!.sub, tier);
  return res.status(200).json({ checkoutUrl: session.url });
}

export async function stripeWebhook(req: Request, res: Response) {
  const signature = req.headers['stripe-signature'];
  if (!signature || typeof signature !== 'string') return res.status(400).send('Missing signature');

  const event = stripe.webhooks.constructEvent(req.body, signature, env.STRIPE_WEBHOOK_SECRET);
  await handleSubscriptionWebhook(event);
  return res.status(200).json({ received: true });
}
