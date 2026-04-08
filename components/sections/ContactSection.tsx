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

  return (
    <section id="contact" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="mb-12">
        <p className="text-brand-gold uppercase tracking-widest text-sm font-medium mb-2">Get In Touch</p>
        <h2 className="section-title">Contact Us</h2>
        <span className="gold-line" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info + Map */}
        <div className="space-y-6">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-brand-light/80"><Phone size={18} className="text-brand-gold shrink-0" /><a href={`tel:${settings.phone}`} className="hover:text-brand-gold">{settings.phone}</a></li>
            <li className="flex items-center gap-3 text-brand-light/80"><Mail size={18} className="text-brand-gold shrink-0" /><a href={`mailto:${settings.email}`} className="hover:text-brand-gold">{settings.email}</a></li>
            <li className="flex items-start gap-3 text-brand-light/80"><MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />{settings.address}</li>
          </ul>

          {/* Embedded map */}
          <div className="w-full h-64 bg-brand-gray border border-brand-gray overflow-hidden">
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
            <div className="border border-brand-gold p-8 text-center">
              <p className="text-brand-gold text-xl font-heading font-semibold mb-2">Message Sent!</p>
              <p className="text-brand-light/70 text-sm">We'll get back to you as soon as possible.</p>
              <button onClick={() => setSent(false)} className="btn-outline mt-6 text-sm">Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <input
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Your Name"
                  className="w-full bg-brand-gray border border-brand-gray/60 focus:border-brand-gold outline-none px-4 py-3 text-brand-cream placeholder:text-brand-light/40 text-sm transition-colors"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <input
                  {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
                  placeholder="Your Email"
                  type="email"
                  className="w-full bg-brand-gray border border-brand-gray/60 focus:border-brand-gold outline-none px-4 py-3 text-brand-cream placeholder:text-brand-light/40 text-sm transition-colors"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  placeholder="Your Message"
                  rows={5}
                  className="w-full bg-brand-gray border border-brand-gray/60 focus:border-brand-gold outline-none px-4 py-3 text-brand-cream placeholder:text-brand-light/40 text-sm transition-colors resize-none"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
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
