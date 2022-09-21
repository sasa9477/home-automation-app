import { Switcher } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import logger from '../../../logger/logger';
import { ErrorResponse } from '../../../types/ErrorResponse';
import { prismaClient } from '../../../utils/prismaClient';

export type SwitcherUpdateRequest = Pick<Switcher, 'id'> & Partial<Switcher>;
export type SwitcherUpdateResponse = {} | ErrorResponse;

const handler = async (req: NextApiRequest, res: NextApiResponse<SwitcherUpdateResponse>) => {
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
    if (e instanceof Error) {
      e.stack = '';
      logger.error(e);
      res.status(500).json({ message: e.message });
    }
  }
};

export default handler;
