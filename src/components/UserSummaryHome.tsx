import React from 'react';
import { GetAllUserScores } from '@/lib/prismaFunctions';

type UserScore = {
  userid: number;
  Rank: number;
  nickname: string;
  UploadTotal: number;
  UploadNumber: number;
  FixedTotal: number;
  FixedNumber: number;
  total: number;
};

async function selectUserFromData(usernick: string, data: UserScore[]) {
  const currentUser = data.find(
    (user: UserScore) => user.nickname.toLowerCase() === usernick.toLowerCase(),
  );
  return currentUser as UserScore;
}

async function UserSummary({ usernick }: { usernick: string }) {
  const dbData = await GetAllUserScores();
  const data = await selectUserFromData(usernick, dbData);

  return (
    <div className='grid h-20 grid-cols-3'>
      <div className='col-span-3 flex w-full justify-center'>
        <div className='plate'>{data.nickname}</div>
      </div>
      <div className='col-span-3 flex w-full justify-center'>
        <div className='mr-2 flex w-full text-base font-semibold text-gray-700'>
          {data.FixedNumber.toString()} Fixed
        </div>
      </div>
      <div className='col-span-3 flex w-full justify-center'>
        <div className='mr-2 flex w-full text-base font-semibold text-gray-700'>
          £
          {data.FixedTotal.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </div>
      </div>
      <div className='col-span-3 flex w-full justify-center'>
        <div className='mr-2 flex w-full text-base font-semibold text-gray-700'>
          {data.UploadNumber.toString()} Uploaded
        </div>
      </div>
      <div className='col-span-3 flex w-full justify-center'>
        <div className='mr-2 flex w-full text-base font-semibold text-gray-700'>
          £
          {data.UploadTotal.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </div>
      </div>
      <div className='col-span-3 flex w-full justify-center'>
        <div className='mr-2 flex w-full text-base font-semibold text-gray-700'>
          £
          {data.total.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </div>
      </div>
      <div className='col-span-3 flex w-full justify-center'>
        <div className='mr-2 flex w-full text-base font-semibold text-gray-700'>
          <b>{data.Rank.toString()}</b>
          {data.Rank.toString() === '1' ? 'st' : ''}
          {data.Rank.toString() === '2' ? 'nd' : ''}
          {data.Rank.toString() === '3' ? 'rd' : ''}
          {data.Rank > 3 ? 'th' : ''}/{dbData.length.toString()}
        </div>
      </div>
    </div>
  );
}

export default UserSummary;
