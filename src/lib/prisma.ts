import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['info', 'warn', 'error'],
  });

// eslint-disable-next-line no-unused-expressions
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma;

export default prisma;
