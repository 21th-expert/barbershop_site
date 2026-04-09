import { NextRequest, NextResponse } from 'next/server';
import { saveAppointment } from '@/lib/appointments';
import { sendBookingConfirmation } from '@/lib/email';
import { generateId } from '@/lib/utils';
import { Appointment } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[booking] received:', body);

    const { serviceId, serviceName, clientName, clientEmail, clientPhone, date, time } = body;

    if (!serviceId || !clientName || !clientEmail || !date || !time) {
      console.error('[booking] missing fields:', { serviceId, clientName, clientEmail, date, time });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const appointment: Appointment = {
      id: generateId(),
      serviceId,
      serviceName,
      clientName,
      clientEmail,
      clientPhone,
      date,
      time,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    console.log('[booking] saving appointment:', appointment.id);
    saveAppointment(appointment);
    console.log('[booking] saved successfully');

    try {
      await sendBookingConfirmation(appointment);
    } catch (emailErr) {
      console.warn('[booking] email not sent:', emailErr);
    }

    return NextResponse.json({ success: true, id: appointment.id });
  } catch (err) {
    console.error('[booking] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
