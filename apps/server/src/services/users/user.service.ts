import { UserModel } from '../../models/user.model';

export async function getUserProfile(userId: string) {
  return UserModel.findById(userId).select('-passwordHash');
}

export async function setSubscriptionTier(userId: string, tier: 'FREE' | 'PRO' | 'ELITE') {
  return UserModel.findByIdAndUpdate(userId, { subscriptionTier: tier }, { new: true }).select('-passwordHash');
}

export async function getAdminUsageMetrics() {
  const users = await UserModel.countDocuments();
  const byTier = await UserModel.aggregate([{ $group: { _id: '$subscriptionTier', count: { $sum: 1 } } }]);

  return { users, byTier, aiCostUsdMonthEstimate: 1200 };
}
