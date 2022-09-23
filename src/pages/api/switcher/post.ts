import { Switcher } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { prismaClient } from '../../../utils/prismaClient';
import withErrorHandle from '../../../utils/withErrorHandle';

export type SwitcherCreateRequest = Omit<Switcher, 'id' | 'createdAt' | 'updatedAt'>;
export type SwitcherCreateResponse = {};

const handler = async (req: NextApiRequest, res: NextApiResponse<SwitcherCreateResponse>) => {
  const switcher = req.body as SwitcherCreateRequest;

  await prismaClient.switcher.create({
    data: {
      ...switcher,
    },
  });
  res.status(200).end();
};

export default withErrorHandle(handler);
