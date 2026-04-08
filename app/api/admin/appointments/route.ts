import { NextRequest, NextResponse } from 'next/server';
import { getAppointments, updateAppointmentStatus } from '@/lib/appointments';

export async function GET() {
  return NextResponse.json(getAppointments());
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  updateAppointmentStatus(id, status);
  return NextResponse.json({ ok: true });
}
