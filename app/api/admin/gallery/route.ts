import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { GalleryImage } from '@/lib/types';
import { generateId } from '@/lib/utils';

const FILE = path.join(process.cwd(), 'data', 'gallery.json');

function read(): GalleryImage[] {
  return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
}
function write(data: GalleryImage[]) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const images = read();
  images.push({ id: generateId(), ...body });
  write(images);
  return NextResponse.json(images);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const images = read().filter((i) => i.id !== id);
  write(images);
  return NextResponse.json(images);
}
