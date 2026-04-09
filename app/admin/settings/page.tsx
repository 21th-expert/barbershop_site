'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import initialSettings from '@/data/settings.json';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit } = useForm<SiteSettings>({ defaultValues: initialSettings as SiteSettings });

  async function onSubmit(data: SiteSettings) {
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputCls = 'w-full bg-white border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none px-3 py-2 text-slate-800 text-sm rounded-lg transition-all';
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-slate-800">Settings</h1>
        {saved && <span className="flex items-center gap-1 text-green-600 text-sm font-medium"><CheckCircle size={14} /> Saved!</span>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-blue-600 text-sm uppercase tracking-wider font-semibold mb-4">General</h2>
          <div className="space-y-3">
            <input {...register('shopName')} placeholder="Shop Name" className={inputCls} />
            <input {...register('tagline')} placeholder="Tagline" className={inputCls} />
            <input {...register('phone')} placeholder="Phone" className={inputCls} />
            <input {...register('email')} placeholder="Email" className={inputCls} />
            <input {...register('address')} placeholder="Address" className={inputCls} />
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-blue-600 text-sm uppercase tracking-wider font-semibold mb-4">Business Hours</h2>
          <div className="space-y-2">
            {days.map((day, i) => (
              <div key={day} className="grid grid-cols-4 gap-2 items-center">
                <span className="text-slate-600 text-sm font-medium">{day}</span>
                <input {...register(`businessHours.${i}.open`)} className={inputCls} placeholder="09:00" />
                <input {...register(`businessHours.${i}.close`)} className={inputCls} placeholder="19:00" />
                <label className="flex items-center gap-2 text-sm text-slate-500">
                  <input type="checkbox" {...register(`businessHours.${i}.closed`)} className="accent-blue-600" />
                  Closed
                </label>
              </div>
            ))}
          </div>
        </section>

        <button type="submit" className="btn-primary">Save Settings</button>
      </form>
    </div>
  );
}
