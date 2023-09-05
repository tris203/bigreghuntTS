'use client';

import { FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';
import imageKitLoader from '@/lib/imageKit';

function ProfilePic({ pfpURL }: { pfpURL: string | undefined | null }) {
  if (pfpURL) {
    return (
      <Image
        className='class="h-8 w-8 rounded-full pr-1'
        loader={imageKitLoader}
        alt='Profile picture'
        src={`/brh_upload_images/brh_pfp/${pfpURL}`}
        height={24}
        width={24}
        style={{
          objectFit: 'contain',
        }}
        placeholder='empty'
      />
    );
  }

  return <FaUserCircle size='24' className='top-navigation-icon' />;
}

export default ProfilePic;
