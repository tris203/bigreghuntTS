'use client';

import React from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { useRouter } from 'next/navigation';

const authenticator = async () => {
  try {
    const response = await fetch('/api/uploadToken', {});

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

  const onError = (err: any) => {
    console.log('Error', err);
  };

  const onSuccess = async (res: any) => {
    const filename = res.name;
    const reply = await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify({ filename }),
    }).then((res) => {
      if (res.ok) {
        router.refresh();
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
