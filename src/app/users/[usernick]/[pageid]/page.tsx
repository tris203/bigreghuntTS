import { getData, getCount } from '@/lib/prismaFunctions';
import { perPage } from '@/lib/static';
import TableBody from '@/components/TableBody';
import Pagination from '@/components/Pagination';
import UserSummary from '@/components/UserSummary';

export default async function UserNickPage({
  params,
}: {
  params: { pageid: number; usernick: string };
}) {
  const data = await getData(perPage, params.pageid, params.usernick);
  const count = await getCount(params.usernick);
  const pages = Math.ceil(count / perPage);

  if (data.length === 0) {
    return (
      <main>
        <div className='pt-3 text-center'>
          <span className='mr-2 text-center text-2xl text-gray-700'>
            {params.usernick}
            not found
          </span>
        </div>
      </main>
    );
  }

  return (
    <main>
      <UserSummary usernick={params.usernick} />
      <div className='ml-2 mt-1 inline-flex'>
        <h3 className='mr-2 pb-2 text-sm font-bold text-gray-800'>POSTS</h3>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5'>
        {data.map((registration) => (
          <TableBody registration={registration} key={registration.id} />
        ))}
      </div>
      {pages > 1 && (
        <div>
          <Pagination
            numOfPages={pages}
            baseUrl={`/users/${params.usernick}/`}
            currentPage={params.pageid}
          />
        </div>
      )}
    </main>
  );
}
