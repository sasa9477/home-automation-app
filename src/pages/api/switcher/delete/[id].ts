import { NextApiHandler } from 'next';
import { SwitcherDeleteRequest, SwitcherDeleteResponse } from '../../../../interfaces';
import { prismaClient } from '../../../../utils/prismaClient';

const handler: NextApiHandler<SwitcherDeleteResponse> = async (req, res) => {
  const { queryId } = req.query;
  const id = Number(queryId);

  if (!id) {
    res.status(422).end();
    return;
  }

  // TODO: secure api = use session

  try {
    await prismaClient.switcher.delete({
      where: {
        id: id,
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
