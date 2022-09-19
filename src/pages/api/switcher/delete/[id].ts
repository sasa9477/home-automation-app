import { NextApiHandler } from 'next';

import logger from '../../../../logger/logger';
import { prismaClient } from '../../../../utils/prismaClient';

export type SwitcherDeleteRequest = {
  id: number;
};
export type SwitcherDeleteResponse = {};

const handler: NextApiHandler<SwitcherDeleteResponse> = async (req, res) => {
  const { id: queryId } = req.query;
  const id = Number(queryId);

  if (!id) {
    res.status(422).end();
    return;
  }

  try {
    await prismaClient.switcher.delete({
      where: {
        id: id,
      },
    });
    res.status(200).end();
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

export default handler;
