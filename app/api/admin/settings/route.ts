import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'data', 'settings.json');

export async function GET() {
  return NextResponse.json(JSON.parse(fs.readFileSync(FILE, 'utf-8')));
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  return NextResponse.json({ ok: true });
}
