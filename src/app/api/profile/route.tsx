import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const path = req.nextUrl.searchParams.get('path') || '/';
  revalidatePath(path);
  return new Response(JSON.stringify({ body }));
}
