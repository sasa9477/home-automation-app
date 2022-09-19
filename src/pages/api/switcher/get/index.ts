import { NextApiHandler } from 'next';

import { SwitcherGetResponse } from '../../../../interfaces';
import logger from '../../../../logger/logger';
import { prismaClient } from '../../../../utils/prismaClient';

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
