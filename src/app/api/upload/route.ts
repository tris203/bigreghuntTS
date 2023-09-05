import { getServerSession } from 'next-auth/next';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(options);
  const body = await req.json();
  const filename = body.filename;

  // Define SessionUser type as an object with a user property containing an id property
  type SessionUser = {
    user: {
      id?: string;
    };
  };

  // Cast session?.user?.id as SessionUser and extract the id property
  const userId = Number((session?.user as SessionUser)?.user?.id) || 1; // Provide a default value if id doesn't exist

  const newRecord = await prisma.files.create({
    data: {
      filename: filename,
      userid: userId,
      deleted: false,
    },
  });

  return new Response(JSON.stringify(newRecord));
}
