'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Scissors } from 'lucide-react';
import settings from '@/data/settings.json';

const links = [
  { label: 'Services', href: '/#services' },
  { label: 'Gallery',  href: '/#gallery' },
  { label: 'Contact',  href: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur border-b border-brand-gray">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-brand-gold font-heading font-bold text-xl">
          <Scissors size={22} />
          {settings.shopName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-brand-light hover:text-brand-gold transition-colors text-sm font-medium tracking-wide uppercase">
              {l.label}
            </Link>
          ))}
          <Link href="/booking" className="btn-primary text-sm py-2 px-5">Book Now</Link>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-brand-cream" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-gray border-t border-brand-gray px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-brand-light hover:text-brand-gold transition-colors font-medium uppercase tracking-wide">
              {l.label}
            </Link>
          ))}
          <Link href="/booking" onClick={() => setOpen(false)} className="btn-primary text-sm text-center">Book Now</Link>
        </div>
      )}
    </header>
  );
}
