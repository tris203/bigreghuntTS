import React from 'react';

export default async function Pagination({
  numOfPages,
  baseUrl,
  // optional current page - default to 1
  currentPage = 1,
}: {
  numOfPages: number;
  baseUrl: string;
  currentPage: number;
}) {
  return (
    <div
      className='relative z-0 inline-flex w-full items-center justify-center -space-x-px shadow-sm'
      aria-label='Pagination'
    >
      <a
        href={`${baseUrl}1`}
        aria-disabled={currentPage === 1 ? 'true' : 'false'}
        className='relative inline-flex cursor-pointer items-center border border-gray-300 bg-white px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 focus:border-gray-300 focus:outline-offset-0 focus:ring-1 focus:ring-gray-300'
      >
        <span className='sr-only'>Previous</span>
        <svg
          className='h-5 w-5 text-gray-400'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='m6.707 5.293 1.414 1.414L4.828 10l3.293 3.293-1.414 1.414L2 10l4.707-4.707Z'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='m13.707 5.293 1.414 1.414L11.828 10l3.293 3.293-1.414 1.414L9 10l4.707-4.707Z'
          />
        </svg>
      </a>
      {[...Array(numOfPages)].map((_, i) => {
        if (Math.abs(currentPage - i) <= 3) {
          return (
            <a
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              href={`${baseUrl}${i + 1}`}
              aria-current={i + 1 === currentPage ? 'page' : undefined}
              className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            >
              {i + 1}
            </a>
          );
        }
        return null;
      })}
      <a
        href={`${baseUrl}${numOfPages}`}
        aria-disabled={currentPage === numOfPages ? 'true' : 'false'}
        className='relative inline-flex cursor-pointer items-center border border-gray-300 bg-white px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 focus:border-gray-300 focus:outline-offset-0 focus:ring-1 focus:ring-gray-300'
      >
        <span className='sr-only'>Next</span>
        <svg
          className='h-5 w-5 text-gray-400'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='m13.293 14.707-1.414-1.414L15.172 10l-3.293-3.293 1.414-1.414L18 10l-4.707 4.707Z'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='m6.293 14.707-1.414-1.414L8.172 10 4.879 6.707l1.414-1.414L11 10l-4.707 4.707Z'
          />
        </svg>
      </a>
    </div>
  );
}
