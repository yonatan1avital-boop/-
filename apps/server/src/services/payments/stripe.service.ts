import Stripe from 'stripe';
import { env } from '../../config/env';
import { UserModel } from '../../models/user.model';
import { SubscriptionModel } from '../../models/subscription.model';

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

const tierPriceMap: Record<'PRO' | 'ELITE', string> = {
  PRO: 'price_pro_123',
  ELITE: 'price_elite_123'
};

export async function createCheckoutSession(userId: string, tier: 'PRO' | 'ELITE') {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error('User not found');

  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({ email: user.email, name: user.name, metadata: { userId } });
    customerId = customer.id;
    user.stripeCustomerId = customerId;
    await user.save();
  }

  return stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: tierPriceMap[tier], quantity: 1 }],
    success_url: `${env.FRONTEND_URL}/dashboard?billing=success`,
    cancel_url: `${env.FRONTEND_URL}/dashboard?billing=cancelled`
  });
}

export async function handleSubscriptionWebhook(event: Stripe.Event) {
  if (event.type !== 'customer.subscription.updated' && event.type !== 'customer.subscription.created') return;

  const subscription = event.data.object as Stripe.Subscription;
  const customerId = subscription.customer as string;
  const user = await UserModel.findOne({ stripeCustomerId: customerId });
  if (!user) return;

  const tier = subscription.items.data[0].price.id.includes('elite') ? 'ELITE' : 'PRO';
  user.subscriptionTier = tier;
  await user.save();

  await SubscriptionModel.findOneAndUpdate(
    { stripeSubscriptionId: subscription.id },
    {
      userId: user.id,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      status: subscription.status,
      tier,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000)
    },
    { upsert: true, new: true }
  );
}

export { stripe };
