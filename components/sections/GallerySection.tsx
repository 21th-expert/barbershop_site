'use client';
import { useState } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/lib/types';
import gallery from '@/data/gallery.json';

const images = gallery as GalleryImage[];
const categories = ['All', ...Array.from(new Set(images.map((i) => i.category)))];

export default function GallerySection() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? images : images.filter((i) => i.category === active);

  return (
    <section id="gallery" className="py-24 bg-brand-gray/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <p className="text-brand-gold uppercase tracking-widest text-sm font-medium mb-2">Our Work</p>
          <h2 className="section-title">Gallery</h2>
          <span className="gold-line" />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 text-sm font-medium uppercase tracking-wide border transition-colors ${
                active === cat
                  ? 'bg-brand-gold text-brand-black border-brand-gold'
                  : 'border-brand-gray text-brand-light/60 hover:border-brand-gold hover:text-brand-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((img) => (
            <div key={img.id} className="relative aspect-square overflow-hidden group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/40 transition-colors flex items-end p-3">
                <span className="text-brand-cream text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
