import { getServerSession } from 'next-auth/next';
import { DefaultSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);
  const body = await req.json();
  const { fileid, ReasonID } = body;
  // Define SessionUser type as an object with a user property containing an id property
  type SessionUser = DefaultSession['user'] & {
    id?: string;
  };

  // Cast session?.user?.id as SessionUser and extract the id property
  const userId = Number((session?.user as SessionUser).id) || 0;

  if (!fileid || !ReasonID || !userId) {
    return new Response(
      JSON.stringify({ error: 'Missing fileid or reportReason' }),
    );
  }
  try {
    const newReport = await prisma.report_files.create({
      data: {
        FileID: Number(fileid),
        UserID: userId,
        ReasonID: Number(ReasonID),
      },
    });

    const path = req.nextUrl.searchParams.get('path') || '/';
    revalidatePath(path);

    return new Response(JSON.stringify(newReport));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
