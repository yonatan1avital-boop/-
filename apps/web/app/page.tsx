import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-5xl font-bold">LaVision</h1>
      <p className="text-lg text-zinc-300">Subconscious life blueprint engine in immersive 3D.</p>
      <div className="flex gap-4">
        <Link href="/dashboard" className="rounded bg-primary px-4 py-2">Dashboard</Link>
        <Link href="/immersive" className="rounded border border-zinc-700 px-4 py-2">Enter Scene</Link>
      </div>
    </main>
  );
}
