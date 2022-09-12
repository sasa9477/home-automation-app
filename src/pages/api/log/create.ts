import { Prisma } from "@prisma/client";
import { NextApiHandler } from "next";
import { prismaClient } from "../../../utils/prismaClient";

export type LogCreateRequest = Prisma.LogCreateInput & {
}

export type LogCreateResponse = {
}

const handler: NextApiHandler<LogCreateRequest, LogCreateResponse> = async (req, res) => {
  const log = req.body;
  try {
    await prismaClient.log.create({
      data: {
        ...log
      }
    })
    res.status(200).end()
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ errorMessage: e.message })
    }
  }
}

export default handler
