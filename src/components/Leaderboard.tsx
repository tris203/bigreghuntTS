import { Fragment } from 'react';
import { GetAllUserScores } from '@/lib/prismaFunctions';

export default async function Leaderboard() {
  const users = await GetAllUserScores();

  return (
    <>
      <h1 className='text-2md text-center font-bold text-gray-800'>
        Leaderboard
      </h1>
      <div className='grid w-full grid-cols-3 gap-1 md:grid-cols-7'>
        <div className='text-center text-sm font-bold text-gray-800'>#</div>
        <div className='text-center text-sm font-bold text-gray-800'>
          Nickname
        </div>
        <div className='hidden text-center text-sm font-bold text-gray-800 md:flex '>
          Uploaded Files
        </div>
        <div className='hidden text-center text-sm font-bold text-gray-800 md:flex'>
          Uploaded Value
        </div>
        <div className='hidden text-center text-sm font-bold text-gray-800 md:flex'>
          Fixed Files
        </div>
        <div className='hidden text-center text-sm font-bold text-gray-800 md:flex'>
          Fixed Value
        </div>
        <div className='text-center text-sm font-bold text-gray-800'>
          Total Value
        </div>
        {users.map((user) => (
          <Fragment key={user.userid}>
            <div className='text-center text-sm text-gray-800'>
              {user.Rank.toString()}
            </div>
            <a href={`/users/${user.nickname}/1`}>
              <div className='text-center text-sm text-gray-800'>
                {user.nickname.toString()}
              </div>
            </a>
            <div className='hidden text-center text-sm text-gray-800 md:flex'>
              {user.UploadNumber.toString()}
            </div>
            <div className='hidden text-center text-sm text-gray-800 md:flex'>
              {user.UploadTotal.toLocaleString('en-GB', {
                currency: 'GBP',
                style: 'currency',
              })}
            </div>
            <div className='hidden text-center text-sm text-gray-800 md:flex'>
              {user.FixedNumber.toString()}
            </div>
            <div className='hidden text-center text-sm text-gray-800 md:flex'>
              {Number(user.FixedTotal).toLocaleString('en-GB', {
                currency: 'GBP',
                style: 'currency',
              })}
            </div>
            <div className='text-center text-sm text-gray-800'>
              {user.total.toLocaleString('en-GB', {
                currency: 'GBP',
                style: 'currency',
              })}
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}
