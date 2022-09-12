import { Prisma } from "@prisma/client";
import { NextApiHandler } from "next";
import { prismaClient } from "../../../utils/prismaClient";

export type SwitcherCreateRequest = Prisma.SWitcherCreateInput & {
}

export type SwitcherCreateResponse = {
}

const handler: NextApiHandler<SwitcherCreateRequest, SwitcherCreateResponse> = async (req, res) => {
  const switcher = req.body;
  try {
    await prismaClient.sWitcher.create({
      data: {
        ...switcher
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
