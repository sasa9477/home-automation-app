import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import logger from '../logger/logger';

const withErrorHandle = (handler0: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler0(req, res);
    } catch (e) {
      if (e instanceof Error) {
        e.stack = '';
        logger.error(e);
        res.status(500).json({ message: e.message });
      }
    }
  };
};

export default withErrorHandle;
