import { NextApiRequest, NextApiResponse } from 'next';

import { prismaClient } from '../../../../utils/prismaClient';
import withErrorHandle from '../../../../utils/withErrorHandle';

export type SwitcherDeleteRequest = {
  id: number;
};
export type SwitcherDeleteResponse = {};

const handler = async (req: NextApiRequest, res: NextApiResponse<SwitcherDeleteResponse>) => {
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

export default withErrorHandle(handler);
