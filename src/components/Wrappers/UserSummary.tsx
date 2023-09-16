import { getServerSession } from 'next-auth/next';
import UserSummaryHome from '../UserSummaryHome';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function UserSummaryWrapper() {
  const session = await getServerSession(options);

  return (
    <div>
      {session?.user?.name ? (
        <UserSummaryHome usernick={session.user.name} />
      ) : (
        <div className='pointer-events-none blur-sm'>
          <UserSummaryHome usernick='TrisK' />
          Please Log In to Upload
        </div>
      )}
    </div>
  );
}
