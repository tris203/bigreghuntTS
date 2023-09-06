import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import md5 from 'md5';
import prisma from '@/lib/prisma';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email:',
          type: 'text',
        },
        password: {
          label: 'Password:',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = md5(credentials.password) === user.password;

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: `${user.id}`,
          email: user.email,
          name: user.nickname,
          image: user.pfp,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id as string,
        image: token.image as string,
      },
    }),
    jwt: ({ token, user }) => {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id as string,
          image: u.image as string,
        };
      }
      return token;
    },
  },
};
