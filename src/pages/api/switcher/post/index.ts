import { NextApiHandler } from 'next';
import { SwitcherCreateRequest, SwitcherCreateResponse } from '../../../../interfaces';
import { prismaClient } from '../../../../utils/prismaClient';

const handler: NextApiHandler<SwitcherCreateResponse> = async (req, res) => {
  const switcher = req.body as SwitcherCreateRequest;
  try {
    await prismaClient.switcher.create({
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
