import { Switcher } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorResponse } from '../../../common/ErrorResponse';
import logger from '../../../logger/logger';
import { prismaClient } from '../../../utils/prismaClient';

export type SwitcherGetRequest = {};
export type SwitcherGetResponse = Switcher[] | ErrorResponse;

const handler = async (req: NextApiRequest, res: NextApiResponse<SwitcherGetResponse>) => {
  try {
    const switchers = await prismaClient.switcher.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    res.status(200).json(switchers);
  } catch (e) {
    if (e instanceof Error) {
      e.stack = '';
      logger.error(e);
      res.status(500).json({ message: e.message });
    }
  }
};

export default handler;
