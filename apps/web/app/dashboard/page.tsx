import { OverviewCards } from '@/components/dashboard/overview-cards';
import { EveOrb } from '@/components/eve/eve-orb';
import { getDashboard } from '@/lib/server-actions';

export default async function DashboardPage() {
  const dashboard = await getDashboard();

  return (
    <main className="mx-auto min-h-screen max-w-6xl space-y-6 px-6 py-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <OverviewCards data={dashboard} />
      <EveOrb />
    </main>
  );
}
