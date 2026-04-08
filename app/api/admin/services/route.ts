import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Service } from '@/lib/types';
import { generateId } from '@/lib/utils';

const FILE = path.join(process.cwd(), 'data', 'services.json');

function read(): Service[] {
  return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
}
function write(data: Service[]) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  return NextResponse.json(read());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const services = read();
  const newService: Service = { ...body, id: body.id || generateId() };
  services.push(newService);
  write(services);
  return NextResponse.json(services);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const services = read().map((s) => (s.id === body.id ? body : s));
  write(services);
  return NextResponse.json(services);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const services = read().filter((s) => s.id !== id);
  write(services);
  return NextResponse.json(services);
}
