/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
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
  const session = await getServerSession();

  return (
    <>
      <div className='pt-3 text-center'>
        <span className='mr-2 text-center text-2xl text-gray-700'>
          {data.nickname}
        </span>
        {session?.user?.name?.toLowerCase() ===
        data.nickname.toLocaleLowerCase() ? (
          <span className='mr-2 text-base font-semibold text-gray-700'>
            <Link href='/profile'>
              <button
                type='button'
                className='rounded border border-gray-600 bg-transparent px-4 py-2 font-semibold text-gray-700 hover:border-transparent hover:bg-blue-500 hover:text-white'
              >
                Edit Profile
              </button>
            </Link>
          </span>
        ) : null}
      </div>
      <div className='pt-3 text-center'>
        <span className='mr-2 text-base font-semibold text-gray-700'>
          <b>{data.FixedNumber.toString()}</b>
          Fixed
        </span>
        <span className='mr-2 text-base font-semibold text-gray-700'>
          <b>{data.UploadNumber.toString()}</b>
          Uploaded
        </span>
        <span className='text-base font-semibold text-gray-700'>
          <b>{data.Rank.toString()}</b>
          {data.Rank.toString() === '1' ? 'st' : ''}
          {data.Rank.toString() === '2' ? 'nd' : ''}
          {data.Rank.toString() === '3' ? 'rd' : ''}
          {data.Rank > 3 ? 'th' : ''}
        </span>
      </div>
    </>
  );
}

export default UserSummary;
