import { NextApiHandler } from 'next';

import { SwitcherCreateRequest, SwitcherCreateResponse } from '../../../../interfaces';
import { prismaClient } from '../../../../utils/prismaClient';

const handler: NextApiHandler<SwitcherCreateResponse> = async (req, res) => {
  const switcher = req.body as SwitcherCreateRequest;

  await prismaClient.switcher.create({
    data: {
      ...switcher,
    },
  });

  res.status(200).end();
};

export default handler;
