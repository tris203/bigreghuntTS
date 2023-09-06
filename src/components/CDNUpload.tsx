'use client';

import { useTransition } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { useRouter } from 'next/navigation';

const authenticator = async () => {
  try {
    const response = await fetch('/api/uploadToken', { cache: 'no-store' });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error}`);
  }
};

async function CDNUpload({
  publicKey,
  urlEndpoint,
}: {
  publicKey: string;
  urlEndpoint: string;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (err: any) => {
    // console.log('Error', err);
    throw new Error(`Image upload failed: ${err}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = async (res: any) => {
    const filename = res.name;
    await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify({ filename }),
    }).then((result) => {
      if (result.ok) {
        startTransition(() => {
          setTimeout(() => {
            router.refresh();
          }, 250);
        });
      }
    });
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className='mx-2 block w-full cursor-pointer rounded-lg border border-gray-600 bg-gray-700 text-sm text-gray-400 placeholder-gray-400 file:mx-2
        file:rounded-lg file:border-gray-600 file:bg-gray-700 file:text-gray-400'
        fileName='brh_'
        folder='brh_upload_images/brh_images'
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
      />
    </IKContext>
  );
}

export default CDNUpload;
