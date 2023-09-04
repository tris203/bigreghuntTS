import React from 'react';
import { FaUserCircle, FaHome } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';
import { TbRulerMeasure } from 'react-icons/tb';
import { getServerSession } from 'next-auth/next';
import SearchBox from './SearchBox';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { PiSignInBold } from 'react-icons/pi';

async function Header() {
  const session = await getServerSession(options);
  console.log(session);
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
          <span className='top-navigation-icon flex'>
            <FaUserCircle size='24' className='top-navigation-icon' />
            <span className='hidden md:flex'>{session.user?.name}</span>
          </span>
        ) : (
          <span className='top-navigation-icon flex'>
            <PiSignInBold size='24' className='top-navigation-icon' />
            <span className='hidden md:flex'>Sign in</span>
          </span>
        )}
      </span>
    </div>
  );
}

export default Header;
