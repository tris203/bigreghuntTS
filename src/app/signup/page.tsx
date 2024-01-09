import md5 from 'md5';
import { redirect } from 'next/navigation';
import { createUser } from '@/lib/prismaFunctions';

async function processSignup(formdata: FormData) {
  'use server';

  const nickname = formdata.get('nickname');
  const email = formdata.get('email');
  const password = formdata.get('password') as string;
  const hash = md5(password);

  const user = await createUser(
    nickname as string,
    email as string,
    hash as string,
  );

  if (user) {
    redirect('api/auth/signin');
  }
}

function Signup() {
  return (
    <div className='flex w-full flex-col items-center justify-center py-4'>
      <div className='mx-audo container flex max-w-sm flex-1 flex-col items-center justify-center px-2 py-2'>
        <div className='w-full rounded bg-white px-6 py-8 text-black shadow-md'>
          <h1 className='mb-8 text-center text-3xl'>Signup</h1>
          <div>
            <form action={processSignup}>
              <input
                type='text'
                className='border-grey light mb-4 block w-full rounded border p-3'
                placeholder='Nickname'
                name='nickname'
              />
              <input
                type='text'
                className='border-grey light mb-4 block w-full rounded border p-3'
                placeholder='Email'
                name='email'
              />
              <input
                type='password'
                className='border-grey light mb-4 block w-full rounded border p-3'
                placeholder='Password'
                name='password'
              />
              <input
                type='submit'
                className='my-1 w-full rounded bg-green-600 py-3 text-center text-white hover:bg-green-500 focus:outline-none'
                value='Signup'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
