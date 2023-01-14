import { Generations } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db";

type Data = {
    data: Generations[]
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const data = await prisma.generations.findMany()

    res.status(200).json({ data });
};

export default handler;