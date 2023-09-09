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
    <>
      <div className='pt-3 text-center'>
        <span className='mr-2 text-center text-2xl text-gray-700'>
          {data.nickname}
        </span>
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
