import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import pino from 'pino';

import type { LoggerOptions } from 'pino';
const logFilePath = path.join(process.cwd(), process.env.LOG_FILE_PATH);
const logFileRegex = /(.+)\.log$/;
if (!logFileRegex.test(logFilePath)) {
  // eslint-disable-next-line no-console
  console.error('log file extention must be ".log".');
  process.exit(1);
}
const rawFileLogPath = logFilePath.replace(logFileRegex, '$1_raw.log');

const parentDir = path.dirname(logFilePath);

if (!existsSync(parentDir)) {
  mkdirSync(parentDir, {
    recursive: true,
  });
}

const config: LoggerOptions = {
  level: 'info',
  transport: {
    targets: [
      {
        level: 'info',
        target: 'pino-pretty',
        options: {
          destination: logFilePath,
          colorize: false,
          levelFirst: true,
          translateTime: 'SYS:yyyy-MM-dd HH:MM:ss',
        },
      },
      {
        level: 'info',
        target: 'pino/file',
        options: {
          destination: rawFileLogPath,
        },
      },
    ],
  },
};

const logger = pino(config);

export default logger;
