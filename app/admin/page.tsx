'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scissors } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      sessionStorage.setItem('admin_authed', '1');
      router.replace('/admin/appointments');
    } else {
      setError('Invalid credentials');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-brand-gold font-heading font-bold text-2xl mb-1">
            <Scissors size={24} /> Admin
          </div>
          <p className="text-brand-light/50 text-sm">Sign in to manage your barbershop</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full bg-brand-gray border border-brand-gray/60 focus:border-brand-gold outline-none px-4 py-3 text-brand-cream text-sm" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full bg-brand-gray border border-brand-gray/60 focus:border-brand-gold outline-none px-4 py-3 text-brand-cream text-sm" />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Signing in…' : 'Sign In'}</button>
        </form>
      </div>
    </div>
  );
}
