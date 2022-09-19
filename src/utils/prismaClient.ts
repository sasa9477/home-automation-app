import { PrismaClient } from '@prisma/client';

import logger from '../logger/logger';

import type { Prisma } from '@prisma/client';

// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
declare global {
  // issue: $on関数の eventTypeに Prisma.LogLevel を設定できない
  // https://github.com/notiz-dev/nestjs-prisma/issues/23
  // https://github.com/prisma/prisma/issues/11986#issuecomment-1152628803
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel> | undefined;
}

export const prismaClient = global.prisma || new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

prismaClient.$on('query', (e) => {
  // eslint-disable-next-line no-console
  console.log(e.query);
  logger.debug(e.query);
});

prismaClient.$on('info', (event) => {
  logger.info(event.message);
});

prismaClient.$on('warn', (event) => {
  logger.warn(event.message);
});

prismaClient.$on('error', (event) => {
  logger.error(event.message);
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prismaClient;
}
