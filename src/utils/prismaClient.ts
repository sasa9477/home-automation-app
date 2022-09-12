import { PrismaClient } from '@prisma/client'

// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prismaClient =  global.prisma || new PrismaClient({ log: ['query'] })

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prismaClient
}
