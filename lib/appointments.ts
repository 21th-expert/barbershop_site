import fs from 'fs';
import path from 'path';
import { Appointment } from './types';

const FILE = path.join(process.cwd(), 'data', 'appointments.json');

function read(): Appointment[] {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
}

function write(data: Appointment[]) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export function getAppointments(): Appointment[] {
  return read();
}

export function getAppointmentsByDate(date: string): Appointment[] {
  return read().filter((a) => a.date === date && a.status !== 'cancelled');
}

export function saveAppointment(appointment: Appointment): void {
  const all = read();
  all.push(appointment);
  write(all);
}

export function updateAppointmentStatus(id: string, status: Appointment['status']): void {
  const all = read().map((a) => (a.id === id ? { ...a, status } : a));
  write(all);
}
