import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { DefaultSession } from 'next-auth';
import { getManFixRequiredFiles } from '@/lib/prismaFunctions';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function ManFixReqWrapper() {
  type SessionUser = DefaultSession['user'] & {
    id?: string;
  };

  const session = await getServerSession(options);

  // eslint-disable-next-line operator-linebreak
  const userId =
    session?.user && (session?.user as SessionUser).id
      ? Number((session?.user as SessionUser).id)
      : 0;

  const manFixRequiredData = await getManFixRequiredFiles(userId);

  const manfixRequiredCount = manFixRequiredData.length;

  return (
    <div>
      {manfixRequiredCount > 0 ? (
        <Link href='/manfix'>
          <button
            type='button'
            className='my-2 inline-flex items-center rounded bg-gray-200 px-4 py-2 font-bold text-gray-800 hover:bg-gray-300'
          >
            Plates Reviews
            <span className='ml-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white'>
              {manfixRequiredCount}
            </span>
          </button>
        </Link>
      ) : null}
    </div>
  );
}
