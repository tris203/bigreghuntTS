/* eslint-disable indent */

'use client';

import { Fragment } from 'react';
import type { Prisma } from '@prisma/client';
import { Carousel } from 'flowbite-react';
import CDNImage from './CDNImage';
import ProfilePic from './ProfilePic';
import RegistrationDisplay from './RegistrationDisplay';

type NickPFP = Prisma.filesGetPayload<{
  include: {
    bonusmulti: true;
    user: { select: { nickname: true; pfp: true } };
  };
}>;

function CarouselBody({ data }: { data: NickPFP[] }) {
  return (
    <div className='mb-2 flex w-full flex-wrap rounded-sm border bg-white px-2'>
      <div className='flex w-full items-center -space-x-4 px-6 py-3'>
        {data.map((item: NickPFP) => (
          <ProfilePic key={item.id} pfpURL={item.user.pfp} />
        ))}
      </div>
      <div className='flex w-full items-center -space-x-4 px-6'>
        <div className='ml-3 '>
          <span className='block text-sm font-semibold leading-tight antialiased'>
            {data.map((item: NickPFP, index: number) => (
              <Fragment key={`${item.id}${item.user.nickname}`}>
                <span className='font-semibold '>{item.user.nickname}</span>
                {index !== data.length - 1 && (
                  <span className='font-normal'> and </span>
                )}
              </Fragment>
            ))}
          </span>
          <span className='block text-xs text-gray-600' />
        </div>
      </div>
      <div className='container relative h-96'>
        {data.length > 1 ? (
          <Carousel>
            {data.map((item: NickPFP) => (
              <CDNImage
                key={item.id}
                regNumber={item.regnumber}
                filename={
                  item.ext ? `${item.filename}.${item.ext}` : `${item.filename}`
                }
              />
            ))}
          </Carousel>
        ) : (
          <CDNImage
            regNumber={data[0].regnumber}
            filename={
              data[0].ext
                ? `${data[0].filename}.${data[0].ext}`
                : `${data[0].filename}`
            }
          />
        )}
      </div>
      <div className='mx-4 mb-2 mt-3 flex w-full items-center justify-between'>
        <div className='flex gap-5'>
          <RegistrationDisplay regNumber={data[0].regnumber} />
        </div>
        <div className='flex' />
      </div>
      <div className='mx-4 mb-2 mt-3 flex w-full items-center justify-between'>
        <div className='flex w-full gap-5 text-sm font-semibold'>
          {data[0].value
            ? Number(data[0].value).toLocaleString('en-GB', {
                currency: 'GBP',
                style: 'currency',
              })
            : 'Loading...'}
        </div>
        <div className='flex'>
          {/* <ReportMismatchBar /> issue with reporting from carousel */}
        </div>
      </div>
    </div>
  );
}

export default CarouselBody;
