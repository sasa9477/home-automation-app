import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorResponse } from '../../../../common/ErrorResponse';
import logger from '../../../../logger/logger';
import { prismaClient } from '../../../../utils/prismaClient';

export type SwitcherDeleteRequest = {
  id: number;
};
export type SwitcherDeleteResponse = {} | ErrorResponse;

const handler = async (req: NextApiRequest, res: NextApiResponse<SwitcherDeleteResponse>) => {
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
    if (e instanceof Error) {
      e.stack = '';
      logger.error(e);
      res.status(500).json({ message: e.message });
    }
  }
};

export default handler;
