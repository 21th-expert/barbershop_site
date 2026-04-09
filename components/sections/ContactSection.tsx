'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import settings from '@/data/settings.json';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    setLoading(true);
    await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setSent(true);
    setLoading(false);
    reset();
  }

  const inputCls = 'w-full bg-white border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none px-4 py-3 text-slate-800 placeholder:text-slate-400 text-sm transition-all rounded-lg';

  return (
    <section id="contact" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="mb-12">
        <p className="text-blue-600 uppercase tracking-widest text-sm font-semibold mb-2">Get In Touch</p>
        <h2 className="section-title">Contact Us</h2>
        <span className="gold-line" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info + Map */}
        <div className="space-y-6">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-slate-700"><Phone size={18} className="text-blue-600 shrink-0" /><a href={`tel:${settings.phone}`} className="hover:text-blue-600">{settings.phone}</a></li>
            <li className="flex items-center gap-3 text-slate-700"><Mail size={18} className="text-blue-600 shrink-0" /><a href={`mailto:${settings.email}`} className="hover:text-blue-600">{settings.email}</a></li>
            <li className="flex items-start gap-3 text-slate-700"><MapPin size={18} className="text-blue-600 shrink-0 mt-0.5" />{settings.address}</li>
          </ul>

          <div className="w-full h-64 rounded-xl overflow-hidden shadow-md border border-slate-200">
            <iframe
              src={process.env.NEXT_PUBLIC_MAPS_EMBED_URL || `https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Barbershop location"
            />
          </div>
        </div>

        {/* Contact form */}
        <div>
          {sent ? (
            <div className="border border-blue-200 bg-blue-50 p-8 text-center rounded-2xl">
              <p className="text-blue-600 text-xl font-heading font-semibold mb-2">Message Sent!</p>
              <p className="text-slate-500 text-sm">We'll get back to you as soon as possible.</p>
              <button onClick={() => setSent(false)} className="btn-outline mt-6 text-sm">Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <input {...register('name', { required: 'Name is required' })} placeholder="Your Name" className={inputCls} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })} placeholder="Your Email" type="email" className={inputCls} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <textarea {...register('message', { required: 'Message is required' })} placeholder="Your Message" rows={5} className={`${inputCls} resize-none`} />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full gap-2">
                <Send size={16} /> {loading ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
