import { NextApiHandler } from 'next';
import { LogCreateRequest, LogCreateResponse } from '../../../interfaces';
import { prismaClient } from '../../../utils/prismaClient';

const handler: NextApiHandler<LogCreateResponse> = async (req, res) => {
  try {
    await prismaClient.log.create({
      data: {
        ...req.body,
      },
    });
    res.status(200).end();
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ errorMessage: e.message });
    }
  }
};

export default handler;
