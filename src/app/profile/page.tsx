import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { options } from '@/app/api/auth/[...nextauth]/options';
import ProfilePic from '@/components/ProfilePic';

export default async function Profile() {
  const session = await getServerSession(options);
  return (
    <div>
      <div className='mx-auto mt-4 max-w-sm overflow-hidden rounded-lg bg-white shadow-lg'>
        <div className='border-b px-4 pb-6'>
          <div className='my-4 text-center'>
            <ProfilePic pfpURL={session?.user?.image} large />
            <div className='py-2'>
              <h3 className='mb-1 text-2xl font-bold'>{session?.user?.name}</h3>
            </div>
          </div>
          <div className='flex gap-2 px-2'>
            <button
              type='button'
              className='flex-1 rounded-full border-2 border-gray-400 px-4 py-2 font-semibold text-black'
            >
              Edit NickName
            </button>
            <button
              type='button'
              className='flex-1 rounded-full border-2 border-gray-400 px-4 py-2 font-semibold text-black'
            >
              Edit Profile Picture
            </button>
          </div>
          <div className='flex gap-2 px-2 py-2'>
            <button
              type='button'
              className='flex-1 rounded-full border-2 border-gray-400 px-4 py-2 font-semibold text-black'
            >
              Change Password
            </button>

            <button
              type='button'
              className='flex-1 rounded-full border-2 border-gray-400 bg-red-500 px-4 py-2 font-semibold text-black'
            >
              <Link href='/api/auth/signout'>Sign Out</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
