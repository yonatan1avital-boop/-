import { SceneCanvas } from '@/components/scene/scene-canvas';
import { EveOrb } from '@/components/eve/eve-orb';

export default function ImmersivePage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl space-y-6 px-6 py-10">
      <h1 className="text-3xl font-bold">Dream Environment</h1>
      <p className="text-zinc-400">Garage, reflection wall, cinematic lighting, and guided flow.</p>
      <SceneCanvas />
      <EveOrb />
    </main>
  );
}
