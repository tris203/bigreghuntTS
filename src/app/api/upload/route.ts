import { getServerSession } from 'next-auth/next';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(options);
  const body = await req.json();
  const filename = body.filename;
  const userId = Number(session?.user?.id) || 1;

  const newRecord = await prisma.files.create({
    data: {
      filename: filename,
      userid: userId,
      deleted: false,
    },
  });

  return new Response(JSON.stringify(newRecord));
}
