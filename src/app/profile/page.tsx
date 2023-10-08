import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import ProfileEdit from '@/components/ProfileEdit';

export default async function Profile() {
  const session = await getServerSession(options);

  if (!session?.user) {
    return (
      <div>
        <p>Access Denied</p>
      </div>
    );
  }

  return (
    <div>
      <ProfileEdit session={session} />
    </div>
  );
}
