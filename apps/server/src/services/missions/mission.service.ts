import { DailyMissionModel } from '../../models/daily-mission.model';

const missionTemplates = Array.from({ length: 30 }).map((_, i) => ({
  day: i + 1,
  title: `Day ${i + 1} Alignment`,
  description: `Execute REBUILT protocol day ${i + 1}: identity, body, action, and reflection.`
}));

export async function ensureMissionTrack(userId: string) {
  const existingCount = await DailyMissionModel.countDocuments({ userId });
  if (existingCount > 0) return;

  await DailyMissionModel.insertMany(
    missionTemplates.map((template) => ({
      ...template,
      userId,
      unlocked: template.day === 1,
      completed: false
    }))
  );
}

export async function completeMission(userId: string, day: number) {
  const mission = await DailyMissionModel.findOneAndUpdate(
    { userId, day, unlocked: true },
    { completed: true, completedAt: new Date() },
    { new: true }
  );

  if (mission) {
    await DailyMissionModel.updateOne({ userId, day: day + 1 }, { unlocked: true });
  }

  return mission;
}

export async function getMissionProgress(userId: string) {
  const missions = await DailyMissionModel.find({ userId }).sort({ day: 1 });
  const completed = missions.filter((m) => m.completed).length;

  return {
    completed,
    total: 30,
    missions
  };
}
