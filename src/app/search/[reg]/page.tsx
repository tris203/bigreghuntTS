import React from 'react';
import { getSpecificReg } from '@/lib/prismaFunctions';
import TableBody from '@/components/TableBody';

async function SearchResult({
  params,
}: {
  params: {
    reg: number;
  };
}) {
  const data = await getSpecificReg(params.reg);

  if (data.length === 0) {
    return (
      <div>
        <h1>Search Result</h1>
        <p>Search result for reg -{params.reg}</p>
        <p>No results found</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Search Result</h1>
      <p>Search result for reg -{params.reg}</p>
      <div className='mx-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5'>
        {data.map((reg) => (
          <TableBody key={reg.id} registration={reg} />
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
