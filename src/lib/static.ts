export const perPage = 20;

export const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
export const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

export function countPlatesAvailable(length: number): number {
  if (length > 0 && length <= 5) {
    return Math.floor(9 * 10 ** (length - 1) + 9 * 10 ** (length - 2) + 9 * 10 ** (length - 3));
  }
  return 0;
}

export const manfixConfirmationsRequired = 2;
