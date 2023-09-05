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
    <div className='flex w-full'>
      <div className='grid w-full grid-cols-4 justify-between gap-4'>
        <div className='col-span-2 flex w-full justify-center'>
          <div className='grid h-52 grid-cols-3'>
            <div className='col-span-3 flex w-full justify-center'>
              <div className='mr-2 flex w-full justify-center text-center text-2xl font-semibold text-gray-700'>
                4DOTD
              </div>
            </div>
            <div className='col-span-3 flex w-full justify-center'>
              <div className='mr-2 flex w-full justify-center text-base font-semibold text-gray-700'>
                <div className='plate'>{dotd?.reg}</div>
              </div>
            </div>
            <div className='col-span-3 flex w-full justify-center'>
              <div className='mr-2 flex w-full text-base font-semibold text-gray-700'>
                Find and upload the 4DOTD to score 10x Points
              </div>
            </div>
          </div>
        </div>

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
        <div className='col-span-4 flex w-full justify-center'>
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
        <div className='col-span-4 flex w-full justify-center'>
          Last 5 Uploads
        </div>
        <div className='col-span-4 flex w-full justify-center'>
          {last5 ? (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5'>
              {last5.map((registration) => (
                <TableBody registration={registration} key={registration.id} />
              ))}
            </div>
          ) : (
            <div className='flex w-full justify-center'>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
