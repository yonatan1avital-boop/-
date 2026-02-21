import { DashboardData } from '@/types/dashboard';

export async function getDashboard(): Promise<DashboardData> {
  return {
    blueprintCompletion: 72,
    missionsCompleted: 11,
    subscriptionTier: 'PRO',
    sceneReady: true
  };
}
