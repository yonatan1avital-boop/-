import { BlueprintModel } from '../../models/blueprint.model';

export async function upsertBlueprint(userId: string, payload: Record<string, unknown>) {
  const completion = calculateCompletion(payload);
  return BlueprintModel.findOneAndUpdate(
    { userId },
    { ...payload, completionPercentage: completion },
    { upsert: true, new: true }
  );
}

export async function getBlueprint(userId: string) {
  return BlueprintModel.findOne({ userId });
}

function calculateCompletion(payload: Record<string, unknown>) {
  const requiredKeys = ['identity', 'home', 'cars', 'body', 'relationship', 'wealth', 'dailyRoutine', 'emotionalState'];
  const completed = requiredKeys.filter((key) => {
    const value = payload[key];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
    return Boolean(value);
  }).length;

  return Math.round((completed / requiredKeys.length) * 100);
}
