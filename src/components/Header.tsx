import { FaHome } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';
import { TbRulerMeasure } from 'react-icons/tb';
import { getServerSession } from 'next-auth/next';
import { PiSignInBold } from 'react-icons/pi';
import Link from 'next/link';
import SearchBox from './SearchBox';
import { options } from '@/app/api/auth/[...nextauth]/options';
import ProfilePic from './ProfilePic';

async function Header() {
  const session = await getServerSession(options);

  return (
    <div className='top-navigation'>
      <Link href='/'>
        <FaHome size='24' className='top-navigation-icon' />
      </Link>
      <Link href='/users'>
        <MdLeaderboard size='24' className='top-navigation-icon' />
      </Link>
      <SearchBox />
      <Link href='/collections'>
        <TbRulerMeasure size='24' className='top-navigation-icon' />
      </Link>

      <span>
        {session?.user?.name ? (
          <Link href='/profile'>
            <span className='top-navigation-icon flex'>
              <ProfilePic pfpURL={session.user?.image} />
              <span className='hidden md:flex'>{session.user?.name}</span>
            </span>
          </Link>
        ) : (
          <span className='top-navigation-icon flex'>
            <Link href='/api/auth/signin'>
              <PiSignInBold size='24' className='top-navigation-icon' />
              <span className='hidden md:flex'>Sign in</span>
            </Link>
          </span>
        )}
      </span>
    </div>
  );
}

export default Header;
