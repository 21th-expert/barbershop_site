'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Service } from '@/lib/types';
import initialServices from '@/data/services.json';

const inputCls = 'w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none px-3 py-2 text-slate-800 text-sm rounded-lg transition-all';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices as Service[]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm<Service>();

  function openNew() {
    reset({ id: '', name: '', description: '', price: 0, duration: 30, category: '' });
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(s: Service) {
    Object.entries(s).forEach(([k, v]) => setValue(k as keyof Service, v as never));
    setEditing(s);
    setShowForm(true);
  }

  async function onSubmit(data: Service) {
    const res = await fetch('/api/admin/services', {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setServices(await res.json());
    setShowForm(false);
  }

  async function deleteService(id: string) {
    if (!confirm('Delete this service?')) return;
    const res = await fetch('/api/admin/services', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setServices(await res.json());
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-slate-800">Services</h1>
        <button onClick={openNew} className="btn-primary text-sm gap-2"><Plus size={16} /> Add Service</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((s) => (
          <div key={s.id} className="card p-5 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-blue-600 uppercase tracking-wider font-semibold bg-blue-50 px-2 py-0.5 rounded-full">{s.category}</span>
                <span className="text-blue-600 font-bold">{formatPrice(s.price)}</span>
              </div>
              <p className="font-heading font-semibold text-slate-800">{s.name}</p>
              <p className="text-slate-400 text-xs mt-1">{s.duration} min · {s.description.slice(0, 60)}…</p>
            </div>
            <div className="flex gap-2 ml-4 shrink-0">
              <button onClick={() => openEdit(s)} className="text-slate-400 hover:text-blue-600"><Pencil size={15} /></button>
              <button onClick={() => deleteService(s.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X size={20} /></button>
            <h2 className="text-lg font-heading font-semibold text-slate-800 mb-5">{editing ? 'Edit Service' : 'New Service'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input {...register('id', { required: true })} placeholder="ID (e.g. haircut)" className={inputCls} />
              <input {...register('name', { required: true })} placeholder="Service Name" className={inputCls} />
              <input {...register('category', { required: true })} placeholder="Category" className={inputCls} />
              <textarea {...register('description', { required: true })} placeholder="Description" rows={3} className={`${inputCls} resize-none`} />
              <div className="grid grid-cols-2 gap-3">
                <input {...register('price', { required: true, valueAsNumber: true })} type="number" placeholder="Price ($)" className={inputCls} />
                <input {...register('duration', { required: true, valueAsNumber: true })} type="number" placeholder="Duration (min)" className={inputCls} />
              </div>
              <button type="submit" className="btn-primary w-full">{editing ? 'Save Changes' : 'Add Service'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
