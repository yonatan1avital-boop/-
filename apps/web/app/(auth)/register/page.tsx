'use client';

import { FormEvent, useState } from 'react';
import { apiClient } from '@/lib/api-client';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    await apiClient.post('/auth/register', { name, email, password });
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl border border-zinc-800 p-8">
      <h2 className="mb-4 text-2xl font-semibold">Create account</h2>
      <form className="space-y-4" onSubmit={handleRegister}>
        <input className="w-full rounded bg-zinc-900 p-3" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input className="w-full rounded bg-zinc-900 p-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full rounded bg-zinc-900 p-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full rounded bg-primary py-3">Register</button>
      </form>
    </div>
  );
}
