import pino from 'pino';

import type { LoggerOptions } from 'pino';

const config: LoggerOptions = {
  level: 'info',
  transport: {
    targets: [
      {
        level: 'info',
        target: 'pino/file',
        options: {
          destination: 'logs/pino.log',
        },
      },
      {
        level: 'info',
        target: 'pino-pretty',
        options: {
          destination: 'logs/pretty.log',
          colorize: false,
          levelFirst: true,
          translateTime: 'SYS:yyyy-MM-dd HH:MM:ss',
        },
      },
    ],
  },
};

const logger = pino(config);

export default logger;
