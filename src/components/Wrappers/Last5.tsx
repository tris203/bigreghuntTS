import TableBody from '@/components/TableBody';
import { getLast5 } from '@/lib/prismaFunctions';

export default async function Last5Wrapper() {
  const last5 = await getLast5();

  return (
    <>
      {last5.map((registration) => (
        <TableBody registration={registration} key={registration.id} />
      ))}
    </>
  );
}
