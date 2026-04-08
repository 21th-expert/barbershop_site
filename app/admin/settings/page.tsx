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

  const inputCls = 'w-full bg-brand-black border border-brand-gray/60 focus:border-brand-gold outline-none px-3 py-2 text-brand-cream text-sm';
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-brand-cream">Settings</h1>
        {saved && <span className="flex items-center gap-1 text-green-400 text-sm"><CheckCircle size={14} /> Saved!</span>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* General */}
        <section>
          <h2 className="text-brand-gold text-sm uppercase tracking-wider font-semibold mb-4">General</h2>
          <div className="space-y-3">
            <input {...register('shopName')} placeholder="Shop Name" className={inputCls} />
            <input {...register('tagline')} placeholder="Tagline" className={inputCls} />
            <input {...register('phone')} placeholder="Phone" className={inputCls} />
            <input {...register('email')} placeholder="Email" className={inputCls} />
            <input {...register('address')} placeholder="Address" className={inputCls} />
          </div>
        </section>

        {/* Business Hours */}
        <section>
          <h2 className="text-brand-gold text-sm uppercase tracking-wider font-semibold mb-4">Business Hours</h2>
          <div className="space-y-2">
            {days.map((day, i) => (
              <div key={day} className="grid grid-cols-4 gap-2 items-center">
                <span className="text-brand-light/70 text-sm">{day}</span>
                <input {...register(`businessHours.${i}.open`)} className={inputCls} placeholder="09:00" />
                <input {...register(`businessHours.${i}.close`)} className={inputCls} placeholder="19:00" />
                <label className="flex items-center gap-2 text-sm text-brand-light/50">
                  <input type="checkbox" {...register(`businessHours.${i}.closed`)} className="accent-brand-gold" />
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
