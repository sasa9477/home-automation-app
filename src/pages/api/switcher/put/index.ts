import { NextApiHandler } from 'next';

import { SwitcherUpdateRequest, SwitcherUpdateResponse } from '../../../../interfaces';
import { prismaClient } from '../../../../utils/prismaClient';

const handler: NextApiHandler<SwitcherUpdateResponse> = async (req, res) => {
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

export default handler;
