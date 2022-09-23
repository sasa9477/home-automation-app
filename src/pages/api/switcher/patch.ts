import { Switcher } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { prismaClient } from '../../../utils/prismaClient';
import withErrorHandle from '../../../utils/withErrorHandle';

export type SwitcherUpdateRequest = Pick<Switcher, 'id'> & Partial<Switcher>;
export type SwitcherUpdateResponse = {};

const handler = async (req: NextApiRequest, res: NextApiResponse<SwitcherUpdateResponse>) => {
  const switcher = req.body as SwitcherUpdateRequest;

  await prismaClient.switcher.update({
    where: {
      id: switcher.id ?? 0,
    },
    data: {
      ...switcher,
    },
  });
  res.status(200).end();
};

export default withErrorHandle(handler);
