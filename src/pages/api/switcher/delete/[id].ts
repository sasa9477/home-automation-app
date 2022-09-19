import { NextApiHandler } from 'next';

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

  await prismaClient.switcher.delete({
    where: {
      id: id,
    },
  });
  res.status(200).end();
};

export default handler;
