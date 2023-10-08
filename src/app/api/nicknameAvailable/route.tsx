import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { newNick } = body;

  const nickTaken = await prisma.user.count({
    where: {
      nickname: newNick.toLowerCase(),
    },
  });

  const path = req.nextUrl.searchParams.get('path') || '/';
  revalidatePath(path);

  if (nickTaken) {
    return new Response('Nickname taken', { status: 400 });
  }

  return new Response('Nickname available', { status: 200 });
}
