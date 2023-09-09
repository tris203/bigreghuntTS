import { publicKey, urlEndpoint } from '@/lib/static';
import CDNUpload from '@/components/CDNUpload';

async function Upload() {
  return (
    <CDNUpload publicKey={publicKey || ''} urlEndpoint={urlEndpoint || ''} />
  );
}

export default Upload;
