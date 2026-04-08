'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Trash2, Plus, X } from 'lucide-react';
import { GalleryImage } from '@/lib/types';
import initialGallery from '@/data/gallery.json';

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(initialGallery as GalleryImage[]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ src: '', alt: '', category: '' });

  async function addImage() {
    if (!form.src || !form.alt) return;
    const res = await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setImages(await res.json());
    setShowForm(false);
    setForm({ src: '', alt: '', category: '' });
  }

  async function deleteImage(id: string) {
    if (!confirm('Remove this image?')) return;
    const res = await fetch('/api/admin/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setImages(await res.json());
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-brand-cream">Gallery</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm gap-2"><Plus size={16} /> Add Image</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img) => (
          <div key={img.id} className="relative group aspect-square">
            <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="25vw" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <button onClick={() => deleteImage(img.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity">
                <Trash2 size={20} />
              </button>
            </div>
            <span className="absolute bottom-1 left-1 text-xs bg-black/60 text-brand-cream px-1">{img.category}</span>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-brand-gray w-full max-w-md p-6 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-brand-light/40 hover:text-brand-cream"><X size={20} /></button>
            <h2 className="text-lg font-heading font-semibold text-brand-cream mb-5">Add Image</h2>
            <div className="space-y-3">
              <input value={form.src} onChange={(e) => setForm({ ...form, src: e.target.value })} placeholder="Image URL" className="w-full bg-brand-black border border-brand-gray/60 focus:border-brand-gold outline-none px-3 py-2 text-brand-cream text-sm" />
              <input value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} placeholder="Alt text / description" className="w-full bg-brand-black border border-brand-gray/60 focus:border-brand-gold outline-none px-3 py-2 text-brand-cream text-sm" />
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category (e.g. Fade, Beard)" className="w-full bg-brand-black border border-brand-gray/60 focus:border-brand-gold outline-none px-3 py-2 text-brand-cream text-sm" />
              <button onClick={addImage} className="btn-primary w-full">Add to Gallery</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
