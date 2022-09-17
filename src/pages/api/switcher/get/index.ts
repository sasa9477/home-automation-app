import { NextApiHandler } from 'next';

import { SwitcherGetResponse } from '../../../../interfaces';
import { prismaClient } from '../../../../utils/prismaClient';

const handler: NextApiHandler<SwitcherGetResponse> = async (req, res) => {
  const switchers = await prismaClient.switcher.findMany({
    orderBy: {
      id: 'asc',
    },
  });
  res.status(200).json(switchers);
};

export default handler;
