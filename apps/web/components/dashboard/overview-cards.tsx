import { DashboardData } from '@/types/dashboard';

export function OverviewCards({ data }: { data: DashboardData }) {
  const cards = [
    { label: 'Blueprint', value: `${data.blueprintCompletion}%` },
    { label: 'Missions', value: `${data.missionsCompleted}/30` },
    { label: 'Tier', value: data.subscriptionTier },
    { label: 'Scene', value: data.sceneReady ? 'Ready' : 'Generating' }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <article key={card.label} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-sm text-zinc-400">{card.label}</p>
          <p className="text-2xl font-bold">{card.value}</p>
        </article>
      ))}
    </div>
  );
}
