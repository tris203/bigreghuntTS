import './globals.css';
import { getServerSession } from 'next-auth/next';
import { get4DOTD, getLast5 } from '@/lib/prismaFunctions';
import TableBody from '@/components/TableBody';
import Upload from './upload/page';
import UserSummaryHome from '@/components/UserSummaryHome';
// import UserSummaryHome from '@/components/UserSummaryHome';

export default async function Page() {
  const dotd = await get4DOTD();
  const session = await getServerSession();

  const last5 = await getLast5();

  return (
    <div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='w-full flex-col justify-center'>
          <div className='flex w-full justify-center text-center text-2xl font-semibold text-gray-700'>
            4DOTD
          </div>
          <div className='flex w-full justify-center '>
            <div className='plate'>{dotd?.reg}</div>
          </div>
          <div className='flex w-full justify-center text-center'>
            Find and upload the 4DOTD to score 10x Points
          </div>
        </div>
        <div className='mt-2 w-full justify-center text-center '>
          <UserSummaryHome usernick='TrisK' />
        </div>
      </div>

      <div className='grid grid-cols-3 grid-rows-1 gap-4'>
        <div className='col-start-2'>
          {session?.user?.name ? (
            <Upload />
          ) : (
            <div className='pointer-events-none blur-sm'>
              <Upload />
              Please Log In to Upload
            </div>
          )}
        </div>
      </div>

      <div className='flex w-full justify-center'>Last 5 Uploads</div>
      <div className='flex w-full justify-center'>
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
