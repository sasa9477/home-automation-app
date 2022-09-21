import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import { ErrorResponse } from '../../../common/ErrorResponse';
import logger from '../../../logger/logger';

export type LogGetRequest = {};

export type LogGetResponse =
  | {
      log: string;
    }
  | ErrorResponse;

const handler = async (req: NextApiRequest, res: NextApiResponse<LogGetResponse>) => {
  try {
    const logFilePath = process.env.LOG_FILE_PATH;
    const log = fs.readFileSync(path.join(process.cwd(), logFilePath), 'utf8');
    res.status(200).json({ log });
  } catch (e) {
    if (e instanceof Error) {
      e.stack = '';
      logger.error(e);
      res.status(500).json({ message: e.message });
    }
  }
};

export default handler;
