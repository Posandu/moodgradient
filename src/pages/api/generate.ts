import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { prisma } from "../../server/db";
type Data = {
    code: string;
    error?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // Get The query
    const { query = "" } = req.query;

    const configuration = new Configuration({
        apiKey: process.env.OPENAI,
    });

    const openai = new OpenAIApi(configuration);

    const q = await prisma.data.findFirst();
    const count = q?.count || 0;

    if (count >= 1000) {
        res.status(400).json({ code: "", error: "Global Quota Exceeded. Please consider donating to the project to increase the quota or try again later." });
        return;
    }

    // Check if the query is empty
    if (!query?.length || !query || query === "" || query === " " || (query as string)?.trim() === "") {
        res.status(400).json({ code: "", error: "Please provide a query" });
        return;
    }

    // Generate the code
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Generate a creative css gradient code from the given mood which is a JSON object. Sometimes there maybe two or more gradient stops. input:" + JSON.stringify((query as string).trim()) + "\noutput:background:",
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    await prisma.generations.create({
        data: {
            code: response.data.choices[0]?.text?.trim() || "",
            prompt: query as string,
        }
    })

    await prisma.data.updateMany({
        data: {
            count: count + 1
        }
    })

    res.status(200).json({ code: response.data.choices[0]?.text?.trim() || "" });
};

export default handler;