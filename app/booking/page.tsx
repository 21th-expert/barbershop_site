'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { ChevronLeft, CheckCircle, Scissors } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatPrice } from '@/lib/utils';
import { Service } from '@/lib/types';
import services from '@/data/services.json';

const STEPS = ['Service', 'Date & Time', 'Your Details', 'Confirm'];

interface BookingForm {
  name: string;
  email: string;
  phone: string;
}

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<BookingForm>();

  const today = startOfDay(new Date());
  const dates = Array.from({ length: 14 }, (_, i) => addDays(today, i + 1));

  async function fetchSlots(date: string) {
    setLoadingSlots(true);
    const res = await fetch(`/api/booking/slots?date=${date}`);
    const data = await res.json();
    setAvailableSlots(data.slots);
    setLoadingSlots(false);
  }

  async function onSubmit(data: BookingForm) {
    setSubmitting(true);
    await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceId: selectedService!.id,
        serviceName: selectedService!.name,
        date: selectedDate,
        time: selectedTime,
        ...data,
      }),
    });
    setDone(true);
    setSubmitting(false);
  }

  if (done) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-4 pt-16">
          <div className="text-center max-w-md">
            <CheckCircle size={64} className="text-brand-gold mx-auto mb-6" />
            <h1 className="text-3xl font-heading font-bold text-brand-cream mb-3">You're booked!</h1>
            <p className="text-brand-light/70 mb-2">A confirmation email has been sent to <strong>{getValues('email')}</strong>.</p>
            <p className="text-brand-light/50 text-sm mb-8">{selectedService?.name} · {selectedDate} at {selectedTime}</p>
            <Link href="/" className="btn-primary">Back to Home</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 text-brand-gold mb-2">
              <Scissors size={20} />
              <span className="uppercase tracking-widest text-sm font-medium">Online Booking</span>
            </div>
            <h1 className="text-3xl font-heading font-bold text-brand-cream">Book an Appointment</h1>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-between mb-10">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                  i < step ? 'bg-brand-gold border-brand-gold text-brand-black' :
                  i === step ? 'border-brand-gold text-brand-gold' :
                  'border-brand-gray text-brand-gray'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i === step ? 'text-brand-gold' : 'text-brand-light/40'}`}>{s}</span>
                {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-2 ${i < step ? 'bg-brand-gold' : 'bg-brand-gray'}`} />}
              </div>
            ))}
          </div>

          {/* Step 0: Service */}
          {step === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(services as Service[]).map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedService(s); setStep(1); }}
                  className="text-left border border-brand-gray hover:border-brand-gold p-5 transition-colors group"
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-brand-gold uppercase tracking-wider">{s.category}</span>
                    <span className="font-heading font-bold text-brand-gold">{formatPrice(s.price)}</span>
                  </div>
                  <p className="font-heading font-semibold text-brand-cream group-hover:text-brand-gold transition-colors">{s.name}</p>
                  <p className="text-brand-light/50 text-xs mt-1">{s.duration} min</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 1: Date & Time */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-heading font-semibold text-brand-cream mb-4">Select a Date</h2>
              <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 mb-8">
                {dates.map((d) => {
                  const str = format(d, 'yyyy-MM-dd');
                  return (
                    <button
                      key={str}
                      onClick={() => { setSelectedDate(str); setSelectedTime(''); fetchSlots(str); }}
                      className={`p-2 text-center border transition-colors ${
                        selectedDate === str ? 'bg-brand-gold text-brand-black border-brand-gold' : 'border-brand-gray text-brand-light/70 hover:border-brand-gold'
                      }`}
                    >
                      <div className="text-xs">{format(d, 'EEE')}</div>
                      <div className="font-bold">{format(d, 'd')}</div>
                      <div className="text-xs">{format(d, 'MMM')}</div>
                    </button>
                  );
                })}
              </div>

              {selectedDate && (
                <>
                  <h2 className="text-lg font-heading font-semibold text-brand-cream mb-4">Select a Time</h2>
                  {loadingSlots ? (
                    <p className="text-brand-light/50 text-sm">Loading slots…</p>
                  ) : (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {availableSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-2 text-sm border transition-colors ${
                            selectedTime === t ? 'bg-brand-gold text-brand-black border-brand-gold' : 'border-brand-gray text-brand-light/70 hover:border-brand-gold'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                      {availableSlots.length === 0 && <p className="col-span-6 text-brand-light/50 text-sm">No slots available for this day.</p>}
                    </div>
                  )}
                </>
              )}

              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(0)} className="btn-outline gap-2"><ChevronLeft size={16} /> Back</button>
                <button onClick={() => setStep(2)} disabled={!selectedDate || !selectedTime} className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed">Continue</button>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <form onSubmit={handleSubmit(() => setStep(3))} className="space-y-5">
              <div>
                <label className="text-sm text-brand-light/70 mb-1 block">Full Name</label>
                <input {...register('name', { required: 'Required' })} className="w-full bg-brand-gray border border-brand-gray/60 focus:border-brand-gold outline-none px-4 py-3 text-brand-cream text-sm" placeholder="John Doe" />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="text-sm text-brand-light/70 mb-1 block">Email</label>
                <input {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })} type="email" className="w-full bg-brand-gray border border-brand-gray/60 focus:border-brand-gold outline-none px-4 py-3 text-brand-cream text-sm" placeholder="john@email.com" />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-sm text-brand-light/70 mb-1 block">Phone</label>
                <input {...register('phone', { required: 'Required' })} type="tel" className="w-full bg-brand-gray border border-brand-gray/60 focus:border-brand-gold outline-none px-4 py-3 text-brand-cream text-sm" placeholder="+1 (555) 000-0000" />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setStep(1)} className="btn-outline gap-2"><ChevronLeft size={16} /> Back</button>
                <button type="submit" className="btn-primary flex-1">Review Booking</button>
              </div>
            </form>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div>
              <div className="border border-brand-gray p-6 space-y-4 mb-6">
                <h2 className="text-lg font-heading font-semibold text-brand-cream mb-4">Booking Summary</h2>
                {[
                  ['Service', selectedService?.name],
                  ['Price', formatPrice(selectedService?.price ?? 0)],
                  ['Date', selectedDate],
                  ['Time', selectedTime],
                  ['Name', getValues('name')],
                  ['Email', getValues('email')],
                  ['Phone', getValues('phone')],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm border-b border-brand-gray/40 pb-2">
                    <span className="text-brand-light/50">{label}</span>
                    <span className="text-brand-cream font-medium">{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-outline gap-2"><ChevronLeft size={16} /> Back</button>
                <button onClick={handleSubmit(onSubmit)} disabled={submitting} className="btn-primary flex-1 disabled:opacity-40">
                  {submitting ? 'Confirming…' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
