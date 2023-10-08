'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DefaultSession } from 'next-auth';
import { useRouter } from 'next/navigation';
import ProfilePic from './ProfilePic';

function ProfileEdit({ session }: { session: DefaultSession }) {
  const [editingField, setEditingField] = useState('');

  const [newNick, setNewNick] = useState(session?.user?.name || '');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newPfp, setNewPfp] = useState(session?.user?.image);
  const [newPass, setNewPass] = useState('');
  const [newPass2, setNewPass2] = useState('');

  const [nickTaken, setNickTaken] = useState(false);

  const router = useRouter();

  function updateProfile() {
    if (newPass !== newPass2) {
      return;
    }
    let body = '';
    if (editingField === 'nick') {
      body = JSON.stringify({
        name: newNick,
      });
    }
    if (editingField === 'pfp') {
      body = JSON.stringify({
        image: newPfp,
      });
    }
    if (editingField === 'pass') {
      body = JSON.stringify({
        password: newPass,
        password2: newPass2,
      });
    }

    fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify({
        body,
      }),
    }).then((res) => {
      if (res.status === 200) {
        setEditingField('');
        router.refresh();
      }
    });
  }

  useEffect(() => {
    if (newNick !== session?.user?.name) {
      fetch('/api/nicknameAvailable', {
        method: 'POST',
        body: JSON.stringify({
          newNick,
        }),
      }).then((res) => {
        if (res.status === 200) {
          setNickTaken(false);
        } else {
          setNickTaken(true);
        }
      });
    }
  }, [newNick, session?.user?.name]);

  return (
    <div className='mx-auto mt-4 max-w-sm overflow-hidden rounded-lg bg-white shadow-lg'>
      <div className='border-b px-4 pb-6'>
        <div className='my-4 text-center'>
          {editingField === 'pfp' ? (
            'editing pfp'
          ) : (
            <ProfilePic pfpURL={session?.user?.image} large />
          )}
          <div className='py-2'>
            <h3 className='mb-1 text-2xl font-bold'>
              {editingField === 'nick' ? (
                <>
                  <input
                    type='text'
                    value={newNick}
                    onChange={(e) => setNewNick(e.target.value)}
                    placeholder='New Nickname'
                  />
                  {nickTaken ? (
                    <span className='ml-1 mt-1 flex items-center justify-center text-center text-xs font-medium tracking-wide text-red-500'>
                      Username is unavailable
                    </span>
                  ) : null}
                  <button
                    type='button'
                    className='flex-1 rounded-full border-2 border-gray-400 px-4 py-2 text-sm font-semibold text-black'
                    onClick={() => updateProfile()}
                    disabled={nickTaken}
                  >
                    Change Nickname
                  </button>
                </>
              ) : (
                session?.user?.name
              )}
            </h3>
            {editingField === 'pass' ? (
              <>
                <input
                  type='password'
                  id='pass'
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder='New Password'
                />

                <input
                  type='password'
                  id='pass2'
                  value={newPass2}
                  onChange={(e) => setNewPass2(e.target.value)}
                  placeholder='Confirm New Password'
                />
                <button
                  type='button'
                  onClick={() => updateProfile()}
                  className='flex-1 rounded-full border-2 border-gray-400 px-4 py-2 text-sm font-semibold text-black'
                >
                  Change Password
                </button>
              </>
            ) : null}
            {}
          </div>
        </div>
        <div className='flex gap-2 px-2'>
          <button
            type='button'
            className='flex-1 rounded-full border-2 border-gray-400 px-4 py-2 font-semibold text-black'
            onClick={() => setEditingField('nick')}
          >
            Edit NickName
          </button>
          <button
            type='button'
            className='flex-1 rounded-full border-2 border-gray-400 px-4 py-2 font-semibold text-black'
            onClick={() => setEditingField('pfp')}
          >
            Edit Profile Picture
          </button>
        </div>
        <div className='flex gap-2 px-2 py-2'>
          <button
            type='button'
            className='flex-1 rounded-full border-2 border-gray-400 px-4 py-2 font-semibold text-black'
            onClick={() => setEditingField('pass')}
          >
            Change Password
          </button>

          <button
            type='button'
            className='flex-1 rounded-full border-2 border-gray-400 bg-red-500 px-4 py-2 font-semibold text-black'
          >
            <Link href='/api/auth/signout'>Sign Out</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
