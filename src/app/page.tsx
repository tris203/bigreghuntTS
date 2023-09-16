import './globals.css';

import { Suspense } from 'react';
import Last5Wrapper from '@/components/Wrappers/Last5';
import FourDOTDWrapper from '@/components/Wrappers/FourDOTD';
import ManFixReqWrapper from '@/components/Wrappers/ManFixReq';
import UploadWrapper from '@/components/Wrappers/Upload';
import UserSummaryWrapper from '@/components/Wrappers/UserSummary';
import Last5Suspense from '@/components/Wrappers/Last5Suspense';

export default async function Page() {
  return (
    <div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='w-full flex-col justify-center'>
          <div className='flex w-full justify-center text-center text-2xl font-semibold text-gray-700'>
            4DOTD
          </div>
          <div className='flex w-full justify-center '>
            <Suspense fallback={<div>Loading...</div>}>
              <FourDOTDWrapper />
            </Suspense>
          </div>
          <div className='flex w-full justify-center text-center'>
            Find and upload the 4DOTD to score 10x Points
          </div>
          <div className='flex w-full justify-center text-center'>
            <Suspense fallback={null}>
              <ManFixReqWrapper />
            </Suspense>
          </div>
        </div>
        <div className='mt-2 w-full justify-center text-center '>
          <Suspense fallback={<div>Loading...</div>}>
            <UserSummaryWrapper />
          </Suspense>
        </div>
      </div>

      <div className='grid grid-cols-3 grid-rows-1 gap-4'>
        <div className='col-span-3 col-start-1 mr-5 md:col-span-1 md:col-start-2'>
          <Suspense fallback={<div>Loading...</div>}>
            <UploadWrapper />
          </Suspense>
        </div>
      </div>

      <div className='flex w-full justify-center'>Last 5 Uploads</div>
      <div className='flex w-full justify-center'>
        <div className='mx-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5'>
          <Suspense fallback={<Last5Suspense />}>
            <Last5Wrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
