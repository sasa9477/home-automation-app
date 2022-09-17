import { NextApiHandler } from 'next';

import { SwitcherDeleteRequest, SwitcherDeleteResponse } from '../../../../interfaces';
import { prismaClient } from '../../../../utils/prismaClient';

const handler: NextApiHandler<SwitcherDeleteResponse> = async (req, res) => {
  const { id: queryId } = req.query;
  const id = Number(queryId);

  if (!id) {
    res.status(422).end();
    return;
  }

  // TODO: secure api = use session

  await prismaClient.switcher.delete({
    where: {
      id: id,
    },
  });
  res.status(200).end();
};

export default handler;
