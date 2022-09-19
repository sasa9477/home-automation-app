import { Prisma, Switcher } from '@prisma/client';
import { NextApiHandler } from 'next';

import logger from '../../../../logger/logger';
import { prismaClient } from '../../../../utils/prismaClient';

export type SwitcherCreateRequest = Omit<Switcher, 'id' | 'createdAt' | 'updatedAt'>;
export type SwitcherCreateResponse = {};

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
