import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';

const handler = () => {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
  });
  const token = imagekit.getAuthenticationParameters();
  return NextResponse.json(token);
};

export { handler as GET, handler as POST };
