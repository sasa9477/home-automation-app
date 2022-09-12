import { Prisma } from "@prisma/client";
import { NextApiHandler } from "next";
import { prismaClient } from "../../../utils/prismaClient";

export type SwitcherUpdateRequest = Prisma.SWitcherUncheckedCreateInput & {
}

export type SwitcherUpdateResponse = {
}

const handler: NextApiHandler<SwitcherUpdateRequest, SwitcherUpdateResponse> = async (req, res) => {
  const switcher = req.body;
  try {
    await prismaClient.sWitcher.update({
      where: {
        id: switcher.id ?? 0
      },
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
