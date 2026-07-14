import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const customersDir = path.join(process.cwd(), 'public', 'customers');
    const files = fs.readdirSync(customersDir);
    
    // Filter only image files (jpg, jpeg, png, webp, etc.)
    const images = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext);
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error reading customers directory:', error);
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 });
  }
}
