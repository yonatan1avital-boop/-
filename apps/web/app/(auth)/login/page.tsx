'use client';

import { FormEvent, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/stores/auth-store';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setSession = useAuthStore((s) => s.setSession);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const response = await apiClient.post('/auth/login', { email, password });
    setSession(response.data.accessToken, response.data.user);
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl border border-zinc-800 p-8">
      <h2 className="mb-4 text-2xl font-semibold">Login</h2>
      <form className="space-y-4" onSubmit={handleLogin}>
        <input className="w-full rounded bg-zinc-900 p-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full rounded bg-zinc-900 p-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full rounded bg-primary py-3">Sign in</button>
      </form>
    </div>
  );
}
