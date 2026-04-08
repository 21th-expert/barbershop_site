import { NextRequest, NextResponse } from 'next/server';
import { getAppointmentsByDate } from '@/lib/appointments';
import { generateTimeSlots } from '@/lib/utils';
import settings from '@/data/settings.json';
import { format, parseISO } from 'date-fns';

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date');
  if (!date) return NextResponse.json({ error: 'date required' }, { status: 400 });

  const dayName = format(parseISO(date), 'EEEE');
  const hours = settings.businessHours.find((h) => h.day === dayName);

  if (!hours || hours.closed) {
    return NextResponse.json({ slots: [] });
  }

  const allSlots = generateTimeSlots(hours.open, hours.close, 30);
  const booked = getAppointmentsByDate(date).map((a) => a.time);
  const slots = allSlots.filter((s) => !booked.includes(s));

  return NextResponse.json({ slots });
}
