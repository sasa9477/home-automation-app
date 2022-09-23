import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import withErrorHandle from '../../../utils/withErrorHandle';

export type LogDeleteRequest = {};
export type LogDeleteResponse = {};

const handler = async (req: NextApiRequest, res: NextApiResponse<LogDeleteResponse>) => {
  const logFilePath = path.join(process.cwd(), process.env.LOG_FILE_PATH);
  // clear log data
  fs.writeFileSync(logFilePath, '', { encoding: 'utf8' });
  res.status(200).end();
};

export default withErrorHandle(handler);
