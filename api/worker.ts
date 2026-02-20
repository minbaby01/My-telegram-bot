import { cb } from "../src/bot.js";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function worker(req: VercelRequest, res: VercelResponse) {
  try {
    const signature = req.headers["upstash-signature"] as string;

    if (!signature) {
      return res.status(401).send("Unauthorized");
    }

    return await cb(req, res);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

export const config = {
  maxDuration: 60,
  api: {
    bodyParser: false,
  },
};
