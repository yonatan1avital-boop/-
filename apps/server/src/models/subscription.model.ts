import { Schema, model, Types } from 'mongoose';

export interface SubscriptionDocument {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  stripeSubscriptionId: string;
  stripePriceId: string;
  status: 'trialing' | 'active' | 'past_due' | 'canceled';
  tier: 'FREE' | 'PRO' | 'ELITE';
  currentPeriodEnd?: Date;
}

const SubscriptionSchema = new Schema<SubscriptionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    stripeSubscriptionId: { type: String, required: true, unique: true },
    stripePriceId: { type: String, required: true },
    status: { type: String, enum: ['trialing', 'active', 'past_due', 'canceled'], required: true },
    tier: { type: String, enum: ['FREE', 'PRO', 'ELITE'], required: true },
    currentPeriodEnd: { type: Date }
  },
  { timestamps: true }
);

export const SubscriptionModel = model<SubscriptionDocument>('Subscription', SubscriptionSchema);
