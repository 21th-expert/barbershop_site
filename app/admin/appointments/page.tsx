'use client';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Appointment } from '@/lib/types';

const statusIcon = {
  confirmed: <CheckCircle size={14} className="text-green-400" />,
  pending:   <Clock size={14} className="text-yellow-400" />,
  cancelled: <XCircle size={14} className="text-red-400" />,
};

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | Appointment['status']>('all');

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const res = await fetch('/api/admin/appointments');
    const data = await res.json();
    setAppointments(data);
    setLoading(false);
  }

  async function updateStatus(id: string, status: Appointment['status']) {
    await fetch('/api/admin/appointments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    fetchData();
  }

  const filtered = filter === 'all' ? appointments : appointments.filter((a) => a.status === filter);
  const sorted = [...filtered].sort((a, b) => (a.date + a.time) > (b.date + b.time) ? -1 : 1);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-brand-cream">Appointments</h1>
        <div className="flex gap-2">
          {(['all', 'confirmed', 'pending', 'cancelled'] as const).map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1 text-xs uppercase tracking-wide border rounded-full transition-colors ${filter === s ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 text-slate-500 hover:border-blue-400'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading…</p>
      ) : sorted.length === 0 ? (
        <p className="text-slate-400">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase tracking-wider">
                <th className="text-left py-3 pr-4">Client</th>
                <th className="text-left py-3 pr-4">Service</th>
                <th className="text-left py-3 pr-4">Date</th>
                <th className="text-left py-3 pr-4">Time</th>
                <th className="text-left py-3 pr-4">Status</th>
                <th className="text-left py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((a) => (
                <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 pr-4">
                    <div className="text-slate-800 font-medium">{a.clientName}</div>
                    <div className="text-slate-400 text-xs">{a.clientEmail}</div>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">{a.serviceName}</td>
                  <td className="py-3 pr-4 text-slate-600">{a.date}</td>
                  <td className="py-3 pr-4 text-slate-600">{a.time}</td>
                  <td className="py-3 pr-4">
                    <span className="flex items-center gap-1 capitalize text-slate-600">
                      {statusIcon[a.status]} {a.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      {a.status !== 'confirmed' && (
                        <button onClick={() => updateStatus(a.id, 'confirmed')} className="text-xs text-green-400 hover:underline">Confirm</button>
                      )}
                      {a.status !== 'cancelled' && (
                        <button onClick={() => updateStatus(a.id, 'cancelled')} className="text-xs text-red-400 hover:underline">Cancel</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
