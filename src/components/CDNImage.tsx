'use client';

import React from 'react';
import Image from 'next/image';
import imageKitLoader from '@/lib/imageKit';

async function CDNImage({
  filename,
  regNumber,
}: {
  filename: string;
  regNumber: string | null;
}) {
  return (
    <div className='container relative h-96'>
      <Image
        loader={imageKitLoader}
        alt={`Registration ${regNumber}` || 'No registration number'}
        src={`/brh_upload_images/brh_images/${filename}`}
        fill
        style={{
          objectFit: 'contain',
        }}
        placeholder='empty'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
    </div>
  );
}

export default CDNImage;
