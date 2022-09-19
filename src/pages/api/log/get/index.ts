import fs from 'fs';
import { NextApiHandler } from 'next';
import path from 'path';

import { LogGetResponse } from '../../../../interfaces';

const handler: NextApiHandler<LogGetResponse> = async (req, res) => {
  const log = fs.readFileSync(path.join(process.cwd(), '/logs/pretty.log'), 'utf8');
  res.status(200).json({ log });
};

export default handler;
