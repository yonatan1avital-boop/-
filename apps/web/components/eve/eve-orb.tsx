'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';

export function EveOrb() {
  const [message, setMessage] = useState('Eve ready.');

  useEffect(() => {
    apiClient
      .post('/eve/chat', { mode: 'motivator', prompt: 'Give me a short daily alignment line.' })
      .then((res) => setMessage(res.data.reply))
      .catch(() => setMessage('Stay focused. Your future is waiting.'));
  }, []);

  return (
    <div className="fixed bottom-6 right-6 max-w-xs rounded-xl border border-cyan-400/40 bg-cyan-500/10 p-4 shadow-lg shadow-cyan-500/30">
      <div className="mb-2 h-3 w-3 animate-pulse rounded-full bg-eve" />
      <p className="text-sm text-cyan-100">{message}</p>
    </div>
  );
}
