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
    <div>
      <h1>Signup</h1>
      <div>
        <form action={processSignup}>
          <input type='text' placeholder='Nickname' name='nickname' />
          <input type='text' placeholder='Email' name='email' />
          <input type='password' placeholder='Password' name='password' />
          <input type='submit' value='Signup' />
        </form>
      </div>
    </div>
  );
}

export default Signup;
