import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

declare module 'next' {
  interface NextApiRequest2<T = any> extends NextApiRequest {
    body: T;
  }

  type NextApiHandler<T = any, U =any> = (req: NextApiRequest2<T>, res: NextApiResponse<U>) => unknown | Promise<unknown>;
}
