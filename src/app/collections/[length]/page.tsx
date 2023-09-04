import React from 'react';
import { getFilesWithLength } from '@/lib/prismaFunctions';
import { countPlatesAvailable } from '@/lib/static';

export default async function SpecficCollection({
  params,
}: {
  params: { length: number };
}) {
  const data = await getFilesWithLength(params.length);
  return (
    <div>
      SpecficCollection
      <h1>
        Length:
        {' '}
        {params.length}
        {' '}
        - Total Found:
        {' '}
        {data.length}
        /
        {countPlatesAvailable(params.length)}
      </h1>
      {data.map((regnumber) => (
        <div key={regnumber.ids}>
          {regnumber.regnumber}
          {' '}
          -
          {regnumber.nicknames}
          {' '}
          -
          {regnumber.ids}
          {' '}
          -
          {' '}
          {regnumber.value.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </div>
      ))}
    </div>
  );
}
