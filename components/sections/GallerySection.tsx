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
    <section id="gallery" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <p className="text-blue-600 uppercase tracking-widest text-sm font-semibold mb-2">Our Work</p>
          <h2 className="section-title">Gallery</h2>
          <span className="gold-line" />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 text-sm font-medium uppercase tracking-wide rounded-full border transition-colors ${
                active === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((img) => (
            <div key={img.id} className="relative aspect-square overflow-hidden rounded-xl group shadow-sm">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-3 rounded-xl">
                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity drop-shadow">
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
