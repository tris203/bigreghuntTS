import './globals.css';
import { getAllData, getAllCount, get4DOTD } from '@/lib/prismaFunctions';
import { perPage } from '@/lib/static';
import TableBody from '@/components/TableBody';
import Pagination from '@/components/Pagination';

export default async function Page() {
  const data = await getAllData(perPage, 1);
  const count = await getAllCount();
  const dotd = await get4DOTD();
  const pages = Math.ceil(count / perPage);

  return (
    <main>
      <h1>All Registrations</h1>
      <div className='plate'>{dotd?.reg}</div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5'>
        {data.map((registration) => (
          <TableBody registration={registration} key={registration.id} />
        ))}
      </div>
      {pages > 1 && (
        <Pagination numOfPages={pages} baseUrl='/page/' currentPage={1} />
      )}
    </main>
  );
}
