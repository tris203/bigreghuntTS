import { FaHome } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';
import { TbRulerMeasure } from 'react-icons/tb';
import { getServerSession } from 'next-auth/next';
import { PiSignInBold } from 'react-icons/pi';
import SearchBox from './SearchBox';
import { options } from '@/app/api/auth/[...nextauth]/options';
import ProfilePic from './ProfilePic';

async function Header() {
  const session = await getServerSession(options);

  return (
    <div className='top-navigation'>
      <a href='/'>
        <FaHome size='24' className='top-navigation-icon' />
      </a>
      <a href='/users'>
        <MdLeaderboard size='24' className='top-navigation-icon' />
      </a>
      <SearchBox />
      <a href='/collections'>
        <TbRulerMeasure size='24' className='top-navigation-icon' />
      </a>

      <span>
        {session?.user?.name ? (
          <a href='/api/auth/signout'>
            <span className='top-navigation-icon flex'>
              <ProfilePic pfpURL={session.user?.image} />
              <span className='hidden md:flex'>{session.user?.name}</span>
            </span>
          </a>
        ) : (
          <span className='top-navigation-icon flex'>
            <a href='/api/auth/signin'>
              <PiSignInBold size='24' className='top-navigation-icon' />
              <span className='hidden md:flex'>Sign in</span>
            </a>
          </span>
        )}
      </span>
    </div>
  );
}

export default Header;
