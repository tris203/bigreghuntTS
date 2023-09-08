/* eslint-disable react/jsx-one-expression-per-line */
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
    <div className='w-full flex-col justify-center text-center'>
      <div className='flex w-full justify-center'>
        <div className='plate'>{data.nickname}</div>
      </div>
      <div className='flex w-full justify-center text-center text-base font-semibold text-gray-700'>
        {data.FixedNumber.toString()} Fixed
      </div>
      <div className='flex w-full justify-center text-center text-base font-semibold text-gray-700'>
        {Number(data.FixedTotal).toLocaleString('en-GB', {
          currency: 'GBP',
          style: 'currency',
        })}
      </div>

      <div className='flex w-full justify-center text-center text-base font-semibold text-gray-700'>
        {data.UploadNumber.toString()} Uploaded
      </div>

      <div className='flex w-full justify-center text-center text-base font-semibold text-gray-700'>
        {data.UploadTotal.toLocaleString('en-GB', {
          currency: 'GBP',
          style: 'currency',
        })}
      </div>

      <div className='flex w-full justify-center text-center text-base font-semibold text-gray-700'>
        {data.total.toLocaleString('en-GB', {
          currency: 'GBP',
          style: 'currency',
        })}
      </div>

      <div className='flex w-full justify-center text-center text-base font-semibold text-gray-700'>
        <b>{data.Rank.toString()}</b>
        {data.Rank.toString() === '1' ? 'st' : ''}
        {data.Rank.toString() === '2' ? 'nd' : ''}
        {data.Rank.toString() === '3' ? 'rd' : ''}
        {data.Rank > 3 ? 'th' : ''}/{dbData.length.toString()}
      </div>
    </div>
  );
}

export default UserSummary;
