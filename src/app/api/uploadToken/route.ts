import ImageKit from 'imagekit';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
  });
  const token = imagekit.getAuthenticationParameters();

  const path = request.nextUrl.searchParams.get('path') || '/';
  revalidatePath(path);

  return new Response(JSON.stringify(token));
}
