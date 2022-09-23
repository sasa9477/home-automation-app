import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import withErrorHandle from '../../../utils/withErrorHandle';

export type LogGetRequest = {};
export type LogGetResponse = {
  log: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<LogGetResponse>) => {
  let log = '';
  const logFilePath = path.join(process.cwd(), process.env.LOG_FILE_PATH);
  if (fs.existsSync(logFilePath)) {
    log = fs.readFileSync(logFilePath, 'utf8');
  }
  res.status(200).json({ log });
};

export default withErrorHandle(handler);
