import { Switcher } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorResponse } from '../../../common/ErrorResponse';
import logger from '../../../logger/logger';
import { prismaClient } from '../../../utils/prismaClient';

export type SwitcherCreateRequest = Omit<Switcher, 'id' | 'createdAt' | 'updatedAt'>;
export type SwitcherCreateResponse = {} | ErrorResponse;

const handler = async (req: NextApiRequest, res: NextApiResponse<SwitcherCreateResponse>) => {
  const switcher = req.body as SwitcherCreateRequest;

  try {
    await prismaClient.switcher.create({
      data: {
        ...switcher,
      },
    });
    res.status(200).end();
  } catch (e) {
    if (e instanceof Error) {
      e.stack = '';
      logger.error(e);
      res.status(500).json({ message: e.message });
    }
  }
};

export default handler;
