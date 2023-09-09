/* eslint-disable no-restricted-exports */
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/upload', '/api/upload', '/api/uploadToken', '/api/mismatch'],
};
