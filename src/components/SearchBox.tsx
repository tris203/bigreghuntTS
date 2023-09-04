'use client';

import React, { useState } from 'react';

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <form action={`/search/${searchTerm}`} method='get' autoComplete='off'>
      <div className='relative'>
        <input
          type='search'
          id='search'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
          placeholder='Search'
          required
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type='submit'
          className='absolute bottom-2.5 right-2.5 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-300'
        >
          <svg
            className='h-4 w-4 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
