export default function Last5Suspense() {
  return (
    <div className='mb-2 flex w-full flex-wrap rounded-sm border bg-white px-2'>
      <div className='flex items-center px-4 py-3'>
        <svg
          className='h-10 w-10 text-gray-200 dark:text-gray-700'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
        </svg>

        <div className='ml-3 '>
          <span className='block text-sm font-semibold leading-tight antialiased'>
            <div className='mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700' />
          </span>
          <span className='block text-xs text-gray-600'>
            <div className='mb-4 mr-4 h-2.5 w-10 rounded-full bg-gray-200 dark:bg-gray-700' />
          </span>
        </div>
      </div>
      <div className='container relative h-96'>
        <div
          role='status'
          className='animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0'
        >
          <div className='flex h-48 w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700 sm:w-96'>
            <svg
              className='h-10 w-10 text-gray-200 dark:text-gray-600'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 20 18'
            >
              <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
            </svg>
          </div>
        </div>
        <div className='mx-4 mb-2 mt-3 flex w-full items-center justify-between'>
          <div className='flex gap-5'>
            <div className='mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700' />
          </div>
          <div className='flex' />
        </div>
        <div className='mx-4 mb-2 mt-3 flex w-full items-center justify-between'>
          <div className='flex w-full gap-5 text-sm font-semibold'>
            <div className='mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700' />
          </div>
          <div className='flex'>
            <div className='mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700' />
          </div>
        </div>
      </div>
    </div>
  );
}
