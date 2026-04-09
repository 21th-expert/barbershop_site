import Link from 'next/link';
import { Scissors, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import settings from '@/data/settings.json';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-white font-heading font-bold text-xl mb-3">
            <Scissors size={20} className="text-blue-400" /> {settings.shopName}
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{settings.tagline}</p>
          <div className="flex gap-4 mt-4">
            {settings.socialLinks.map((s) => (
              <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                {s.platform === 'instagram' ? <Instagram size={20} /> : <Facebook size={20} />}
              </a>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-white font-semibold mb-3 uppercase tracking-wider text-sm">Hours</h4>
          <ul className="space-y-1">
            {settings.businessHours.map((h) => (
              <li key={h.day} className="flex justify-between text-sm text-slate-400">
                <span>{h.day}</span>
                <span>{h.closed ? 'Closed' : `${h.open} – ${h.close}`}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-3 uppercase tracking-wider text-sm">Contact</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2"><Phone size={14} /><a href={`tel:${settings.phone}`} className="hover:text-blue-400">{settings.phone}</a></li>
            <li className="flex items-center gap-2"><Mail size={14} /><a href={`mailto:${settings.email}`} className="hover:text-blue-400">{settings.email}</a></li>
            <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" />{settings.address}</li>
          </ul>
          <Link href="/booking" className="btn-primary text-sm mt-5 inline-flex">Book Appointment</Link>
        </div>
      </div>
      <div className="border-t border-slate-800 text-center py-4 text-xs text-slate-500">
        © {new Date().getFullYear()} {settings.shopName}. All rights reserved.
      </div>
    </footer>
  );
}
