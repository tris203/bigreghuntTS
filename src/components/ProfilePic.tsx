'use client';

import { FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';
import imageKitLoader from '@/lib/imageKit';

function ProfilePic({
  pfpURL,
  large,
}: {
  pfpURL: string | undefined | null;
  large?: boolean;
}) {
  if (pfpURL) {
    return (
      <Image
        className={
          large
            ? 'mx-auto my-4 h-32 w-32 rounded-full border-4 border-white'
            : 'class="h-8 w-8 rounded-full pr-1'
        }
        loader={imageKitLoader}
        alt='Profile picture'
        src={`/brh_upload_images/brh_pfp/${pfpURL}`}
        height={32}
        width={32}
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
