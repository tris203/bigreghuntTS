import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import UserSummaryHome from '../UserSummaryHome';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function UserSummaryWrapper() {
  const session = await getServerSession(options);

  return (
    <div>
      {session?.user?.name ? (
        <UserSummaryHome usernick={session.user.name} />
      ) : (
        <div>
          <div className='pointer-events-none blur-sm'>
            <UserSummaryHome usernick='TrisK' />
          </div>
          Log In or
          {' '}
          <Link href='/signup'>Sign Up</Link>
          {' '}
          to see your stats
        </div>
      )}
    </div>
  );
}
