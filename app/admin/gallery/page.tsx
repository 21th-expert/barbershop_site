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

  const inputCls = 'w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none px-3 py-2 text-slate-800 text-sm rounded-lg transition-all';

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
        <h1 className="text-2xl font-heading font-bold text-slate-800">Gallery</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm gap-2"><Plus size={16} /> Add Image</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img) => (
          <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden shadow-sm">
            <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="25vw" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center rounded-xl">
              <button onClick={() => deleteImage(img.id)} className="opacity-0 group-hover:opacity-100 text-white bg-red-500 hover:bg-red-600 p-2 rounded-full transition-all">
                <Trash2 size={16} />
              </button>
            </div>
            <span className="absolute bottom-2 left-2 text-xs bg-white/90 text-slate-700 px-2 py-0.5 rounded-full font-medium">{img.category}</span>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X size={20} /></button>
            <h2 className="text-lg font-heading font-semibold text-slate-800 mb-5">Add Image</h2>
            <div className="space-y-3">
              <input value={form.src} onChange={(e) => setForm({ ...form, src: e.target.value })} placeholder="Image URL" className={inputCls} />
              <input value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} placeholder="Alt text / description" className={inputCls} />
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category (e.g. Fade, Beard)" className={inputCls} />
              <button onClick={addImage} className="btn-primary w-full">Add to Gallery</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
