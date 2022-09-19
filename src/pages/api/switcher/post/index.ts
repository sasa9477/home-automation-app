import { Prisma } from '@prisma/client';
import { NextApiHandler } from 'next';

import { SwitcherCreateRequest, SwitcherCreateResponse } from '../../../../interfaces';
import logger from '../../../../logger/logger';
import { prismaClient } from '../../../../utils/prismaClient';

const handler: NextApiHandler<SwitcherCreateResponse> = async (req, res) => {
  const switcher = req.body as SwitcherCreateRequest;

  try {
    await prismaClient.switcher.create({
      data: {
        ...switcher,
      },
    });
    res.status(200).end();
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

export default handler;
