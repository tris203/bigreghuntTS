/* eslint-disable no-restricted-exports */
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/upload',
    '/profile',
    '/manfix',
    '/manfix/apply',
    '/api/upload',
    '/api/uploadToken',
    '/api/mismatch',
    '/api/report',
    '/api/manfix',
  ],
};
