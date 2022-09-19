import { Switcher } from '@prisma/client';
import { NextApiHandler } from 'next';

import logger from '../../../logger/logger';
import { prismaClient } from '../../../utils/prismaClient';

export type SwitcherUpdateRequest = Pick<Switcher, 'id'> & Partial<Switcher>;
export type SwitcherUpdateResponse = {};

const handler: NextApiHandler<SwitcherUpdateResponse> = async (req, res) => {
  const switcher = req.body as SwitcherUpdateRequest;

  try {
    await prismaClient.switcher.update({
      where: {
        id: switcher.id ?? 0,
      },
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
