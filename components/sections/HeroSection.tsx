import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import settings from '@/data/settings.json';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&q=80')" }}
      />
      <div className="absolute inset-0 bg-white/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <p className="text-blue-600 uppercase tracking-[0.3em] text-sm font-semibold mb-4">Welcome to</p>
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 mb-4 leading-tight drop-shadow-sm">
          {settings.shopName}
        </h1>
        <span className="block w-16 h-1 bg-blue-600 mx-auto mb-6 rounded-full" />
        <p className="text-slate-700 text-lg md:text-xl mb-10 leading-relaxed">
          {settings.tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/booking" className="btn-primary text-base px-8 py-4">Book Appointment</Link>
          <Link href="/#services" className="btn-outline text-base px-8 py-4">Our Services</Link>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="/#services" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-blue-600 animate-bounce">
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
