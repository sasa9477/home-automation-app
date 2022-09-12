import { Prisma } from '@prisma/client';
import { NextApiHandler } from 'next';
import { prismaClient } from '../../../utils/prismaClient';

export type SwitcherUpdateRequest = Prisma.SwitcherUncheckedCreateInput & {};

export type SwitcherUpdateResponse = {};

const handler: NextApiHandler<SwitcherUpdateResponse> = async (req, res) => {
  const switcher = req.body;
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
    if (e instanceof Error) {
      res.status(500).json({ errorMessage: e.message });
    }
  }
};

export default handler;
