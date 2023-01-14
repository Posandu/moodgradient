import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db";

type Data = {
    quota: number
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const q = await prisma.data.findFirst()
    res.status(200).json({ quota: q?.count || 0 });
};

export default handler;