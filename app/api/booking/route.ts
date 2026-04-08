import { NextRequest, NextResponse } from 'next/server';
import { saveAppointment } from '@/lib/appointments';
import { sendBookingConfirmation } from '@/lib/email';
import { generateId } from '@/lib/utils';
import { Appointment } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serviceId, serviceName, clientName, clientEmail, clientPhone, date, time } = body;

    if (!serviceId || !clientName || !clientEmail || !date || !time) {
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

    saveAppointment(appointment);
    await sendBookingConfirmation(appointment);

    return NextResponse.json({ success: true, id: appointment.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
