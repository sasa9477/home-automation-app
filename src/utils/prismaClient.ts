import { Prisma, PrismaClient } from '@prisma/client';

import logger from '../logger/logger';

// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = (function () {
  // issue: $on関数の eventTypeに Prisma.LogLevel を設定できない
  // https://github.com/notiz-dev/nestjs-prisma/issues/23
  // https://github.com/prisma/prisma/issues/11986#issuecomment-1152628803
  const prisma = new PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>({
    log: ['query', 'info', 'warn', 'error'],
  });
  prisma.$on('query', (e) => {
    // eslint-disable-next-line no-console
    console.log(e.query);
    logger.debug(e.query);
  });

  prisma.$on('info', (event) => {
    logger.info(event.message);
  });

  prisma.$on('warn', (event) => {
    logger.warn(event.message);
  });
  prisma.$on('error', (event) => {
    logger.error(event.message);
  });

  return prisma;
})();

export const prismaClient = global.prisma || prisma;

if (process.env.NODE_ENV !== 'production') global.prisma = prismaClient;
