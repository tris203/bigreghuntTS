import './globals.css';
import { getAllData, getAllCount, get4DOTD } from '@/lib/prismaFunctions';
import { perPage } from '@/lib/static';

export default async function Page() {
  const dotd = await get4DOTD();

  return (
    <main>
      <div className='plate'>{dotd?.reg}</div>
    </main>
  );
}
