import { Schema, model, Types } from 'mongoose';

export type SubscriptionTier = 'FREE' | 'PRO' | 'ELITE';

export interface UserDocument {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  role: 'USER' | 'ADMIN';
  googleId?: string;
  subscriptionTier: SubscriptionTier;
  stripeCustomerId?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, unique: true, required: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    googleId: { type: String },
    subscriptionTier: { type: String, enum: ['FREE', 'PRO', 'ELITE'], default: 'FREE' },
    stripeCustomerId: { type: String },
    avatarUrl: { type: String }
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>('User', UserSchema);
