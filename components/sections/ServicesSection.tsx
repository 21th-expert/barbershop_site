import Link from 'next/link';
import { Clock } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Service } from '@/lib/types';
import services from '@/data/services.json';

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="card p-6 group hover:border-blue-300 transition-all">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs uppercase tracking-widest text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-full">{service.category}</span>
        <span className="text-2xl font-heading font-bold text-blue-600">{formatPrice(service.price)}</span>
      </div>
      <h3 className="text-xl font-heading font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
        {service.name}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">{service.description}</p>
      <div className="flex items-center gap-1 text-slate-400 text-xs">
        <Clock size={12} /> {service.duration} min
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="mb-12">
        <p className="text-blue-600 uppercase tracking-widest text-sm font-semibold mb-2">What We Offer</p>
        <h2 className="section-title">Our Services</h2>
        <span className="gold-line" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(services as Service[]).map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/booking" className="btn-primary text-base px-10 py-4">Book a Service</Link>
      </div>
    </section>
  );
}
