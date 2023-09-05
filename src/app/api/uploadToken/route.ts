import ImageKit from 'imagekit';

export async function GET() {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
  });
  const token = imagekit.getAuthenticationParameters();
  return new Response(JSON.stringify(token));
}
