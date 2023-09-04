import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export default async function GET() {
  const files = await prisma.files.findMany({
    include: {
      user:
        { select: { nickname: true } },
    },

  });
  return NextResponse.json(files);
}
