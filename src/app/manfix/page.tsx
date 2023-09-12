import { getServerSession } from 'next-auth/next';
import { DefaultSession } from 'next-auth';
import {
  getManFixRequiredFiles,
  getHistoricManFix,
} from '@/lib/prismaFunctions';
import { options } from '../api/auth/[...nextauth]/options';
import TableBody from '@/components/TableBody';

type SessionUser = DefaultSession['user'] & {
  id?: string;
};

export default async function ManRev() {
  const session = await getServerSession(options);

  // eslint-disable-next-line operator-linebreak
  const userId =
    session?.user && (session?.user as SessionUser).id
      ? Number((session?.user as SessionUser).id)
      : 0;

  const files = await getManFixRequiredFiles(userId);

  const historicalManFix = await getHistoricManFix(userId);

  return (
    <div>
      <h1>Manual Review</h1>
      <div className='mx-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5'>
        {files.map((file) => (
          <TableBody key={file.id} registration={file} isfixing />
        ))}
      </div>
      <h1>Historical Manual Review</h1>
      <div className='mx-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5'>
        {historicalManFix.map((file) => (
          <TableBody
            key={file.manfixid}
            registration={file.file}
            fixedReg={file.regnumber}
          />
        ))}
      </div>
    </div>
  );
}
