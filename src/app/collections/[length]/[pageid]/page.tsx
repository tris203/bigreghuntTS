/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import type { Prisma } from '@prisma/client';
import { Fragment } from 'react';
import {
  getFilesWithLength,
  getAllNumberbyLength,
} from '@/lib/prismaFunctions';
import { countPlatesAvailable } from '@/lib/static';
import CarouselBody from '@/components/CarouselBody';
import Pagination from '@/components/Pagination';

export default async function SpecficCollection({
  params,
}: {
  params: { length: number; pageid: number };
}) {
  const data = await getFilesWithLength(params.length, Number(params.pageid));
  const availableCollections = await getAllNumberbyLength();

  const specificAvailable = availableCollections.filter(
    (collection) => collection.length === Number(params.length),
  );
  const pages = Math.ceil(Number(specificAvailable[0].count) / 20);

  type NickPFP = Prisma.filesGetPayload<{
    include: {
      bonusmulti: true;
      user: { select: { nickname: true; pfp: true } };
    };
  }>;

  const regnumberMap: Record<string, NickPFP[]> = {};

  data.map((item) => {
    if (!regnumberMap[item.regnumber || '0']) {
      regnumberMap[item.regnumber || '0'] = [];
    }
    regnumberMap[item.regnumber || '0'].push(item as NickPFP);
    return item;
  });

  return (
    <>
      <div>
        Specfic Collection
        <h1>
          Length: {params.length} - Total Found:
          {availableCollections.map((collection) => (
            <Fragment key={collection.length}>
              {collection.length === Number(params.length) &&
                collection.count.toString()}
            </Fragment>
          ))}
          /{countPlatesAvailable(params.length)}
        </h1>
        <div className='mx-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5'>
          {Object.keys(regnumberMap).map((key) => (
            <CarouselBody
              data={regnumberMap[key]}
              key={regnumberMap[key][0].id}
            />
          ))}
        </div>
      </div>
      {pages > 1 && (
        <div>
          <Pagination
            numOfPages={pages}
            baseUrl={`/collections/${params.length}/`}
            currentPage={params.pageid}
          />
        </div>
      )}
    </>
  );
}
