
// src/app/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Add PrismaClient to the globalThis object type for development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    // datasourceUrl: process.env.POSTGRES_PRISMA_URL, // Not strictly needed here if env var is set
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;