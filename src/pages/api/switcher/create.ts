import { Prisma } from '@prisma/client';
import { NextApiHandler } from 'next';
import { prismaClient } from '../../../utils/prismaClient';

export type SwitcherCreateRequest = Prisma.SwitcherCreateInput & {};

export type SwitcherCreateResponse = {};

const handler: NextApiHandler<SwitcherCreateResponse> = async (req, res) => {
  const switcher = req.body;
  try {
    await switcher.create({
      data: {
        ...switcher,
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
