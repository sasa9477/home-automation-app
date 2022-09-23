import { Switcher } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { prismaClient } from '../../../utils/prismaClient';
import withErrorHandle from '../../../utils/withErrorHandle';

export type SwitcherGetRequest = {};
export type SwitcherGetResponse = Switcher[];

const handler = async (req: NextApiRequest, res: NextApiResponse<SwitcherGetResponse>) => {
  const switchers = await prismaClient.switcher.findMany({
    orderBy: {
      id: 'asc',
    },
  });
  res.status(200).json(switchers);
};

export default withErrorHandle(handler);
