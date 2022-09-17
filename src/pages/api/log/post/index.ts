import { NextApiHandler } from 'next';

import { LogCreateResponse } from '../../../../interfaces';
import { prismaClient } from '../../../../utils/prismaClient';

const handler: NextApiHandler<LogCreateResponse> = async (req, res) => {
  await prismaClient.log.create({
    data: {
      ...req.body,
    },
  });
  res.status(200).end();
};

export default handler;
