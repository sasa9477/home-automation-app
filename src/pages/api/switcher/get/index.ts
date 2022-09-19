import { Switcher } from '@prisma/client';
import { NextApiHandler } from 'next';

import logger from '../../../../logger/logger';
import { prismaClient } from '../../../../utils/prismaClient';

export type SwitcherGetRequest = {};
export type SwitcherGetResponse = Switcher[] & {};

const handler: NextApiHandler<SwitcherGetResponse> = async (req, res) => {
  try {
    const switchers = await prismaClient.switcher.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    res.status(200).json(switchers);
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

export default handler;
