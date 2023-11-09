'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/* eslint-disable jsx-a11y/no-autofocus */

export default function RegistrationInput({ fileid }: { fileid: number }) {
  const [newReg, setNewReg] = useState('');
  const [IsUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  function updateReg(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsUpdating(true);
    const success = fetch('/api/manfix', {
      method: 'POST',
      body: JSON.stringify({ fileid, newReg }),
      cache: 'no-store',
    }).then(() => {
      router.refresh();
      setIsUpdating(false);
    });

    return success;
  }

  if (IsUpdating) {
    return (
      <div>Updating</div>
    );
  }

  return (
    <form>
      <div className='plate container'>
        <input
          key={fileid}
          name='newReg'
          className='flex w-full bg-transparent text-white'
          placeholder='|'
          autoFocus
          autoComplete='off'
          onChange={(e) => setNewReg(e.target.value)}
        />
      </div>
      <button
        key={fileid}
        type='submit'
        className='m-2 rounded-sm bg-gray-600 p-1'
        onClick={(e) => updateReg(e)}
      >
        Submit
      </button>
    </form>
  );
}
