import { getServerSession } from 'next-auth/next';
import { options } from '@/app/api/auth/[...nextauth]/options';
import Upload from '@/app/upload/page';

export default async function UploadWrapper() {
  const session = await getServerSession(options);

  return (
    <div>
      {session?.user?.name ? (
        <Upload />
      ) : (
        <div className='pointer-events-none blur-sm'>
          <Upload />
          Please Log In to Upload
        </div>
      )}
    </div>
  );
}
