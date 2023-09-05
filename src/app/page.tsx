import UserSummaryHome from '@/components/UserSummaryHome';
import './globals.css';
import { get4DOTD } from '@/lib/prismaFunctions';
import { getServerSession } from 'next-auth/next';
import { getLast5 } from '@/lib/prismaFunctions';
import TableBody from '@/components/TableBody';
import Upload from './upload/page';

export default async function Page() {
  const dotd = await get4DOTD();
  const session = await getServerSession();
  const last5 = await getLast5();

  return (
    <div>
      <div className='grid w-full grid-cols-2 grid-rows-2 justify-center gap-4 text-center '>
        <div className='w-full text-center align-middle'>
          <div className='flex w-full justify-center text-center text-2xl font-semibold text-gray-700'>
            4DOTD
          </div>
          <div className='flex w-full justify-center'>
            <div className='plate'>{dotd?.reg}</div>
          </div>
          <div className='flex w-full justify-center text-center'>
            Find and upload the 4DOTD to score 10x Points
          </div>
        </div>
        <div className='w-full justify-center align-middle'>
          {' '}
          <div className='col-span-2 flex w-full justify-center'>
            {session?.user?.name ? (
              <UserSummaryHome usernick={session.user.name} />
            ) : (
              <div>
                <div className='pointer-events-none blur-sm'>
                  <UserSummaryHome usernick='TrisK' />
                </div>
                Please Log In to View Your Stats
              </div>
            )}
          </div>
        </div>
        <div className='col-span-2 justify-center text-center align-middle'>
          {session?.user?.name ? (
            <Upload />
          ) : (
            <div>
              <div className='pointer-events-none blur-sm'>
                <Upload />
              </div>
              Please Log In to Upload
            </div>
          )}
        </div>
      </div>

      <div className='col-span-4 flex w-full justify-center'>
        Last 5 Uploads
      </div>
      <div className='col-span-4 flex w-full justify-center'>
        {last5 ? (
          <div className='mx-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5'>
            {last5.map((registration) => (
              <TableBody registration={registration} key={registration.id} />
            ))}
          </div>
        ) : (
          <div className='flex w-full justify-center'>Loading...</div>
        )}
      </div>
    </div>
  );
}
