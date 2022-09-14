import { NextApiHandler } from 'next';
import { SwitcherUpdateRequest, SwitcherUpdateResponse } from '../../../../interfaces';
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
    if (e instanceof Error) {
      res.status(500).json({ errorMessage: e.message });
    }
  }
};

export default handler;
