import { NextApiHandler } from 'next';

import { SwitcherUpdateRequest, SwitcherUpdateResponse } from '../../../../interfaces';
import logger from '../../../../logger/logger';
import { prismaClient } from '../../../../utils/prismaClient';

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
