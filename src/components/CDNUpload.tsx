'use client';

import React from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';

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

const onError = (err: any) => {
  console.log('Error', err);
};

const onSuccess = (res: any) => {
  console.log('Success', res);
};

async function CDNUpload({
  publicKey,
  urlEndpoint,
}: {
  publicKey: string;
  urlEndpoint: string;
}) {
  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <p>Upload an image</p>
      <IKUpload
        fileName='brh_'
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
      />
    </IKContext>
  );
}

export default CDNUpload;
