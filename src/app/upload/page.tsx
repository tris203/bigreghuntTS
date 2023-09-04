import React from 'react';
import { publicKey, urlEndpoint } from '@/lib/static';
import CDNUpload from '@/components/CDNUpload';

async function Upload() {
  return (
    <div>
      <h1>ImageKit React quick start</h1>
      <CDNUpload publicKey={publicKey} urlEndpoint={urlEndpoint} />
    </div>
  );
}

export default Upload;
