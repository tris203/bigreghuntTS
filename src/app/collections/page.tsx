/* eslint-disable react/jsx-one-expression-per-line */
import { Fragment } from 'react';
import Link from 'next/link';
import PercentageComplete from '@/components/PercentageComplete';
import { getAllNumberbyLength } from '@/lib/prismaFunctions';
import { countPlatesAvailable } from '@/lib/static';

async function AvailableCollections() {
  const availableCollections = await getAllNumberbyLength();
  return (
    <div className='grid w-full grid-cols-1 px-4'>
      {availableCollections.map((collection) => (
        <Fragment key={collection.length}>
          <div className='text-center text-4xl font-bold'>
            <Link href={`/collections/${collection.length}`}>
              {collection.length} Digit Plates
            </Link>
          </div>
          <div className='col-span-1'>
            <div className='text-center text-lg'>
              {collection.count.toString()}/
              {countPlatesAvailable(collection.length)} Found
            </div>
          </div>
          <div className='col-span-1'>
            <PercentageComplete
              completed={Number(collection.count)}
              total={countPlatesAvailable(collection.length)}
            />
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default AvailableCollections;
