import { cb } from "../src/bot.js";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Receiver } from "@upstash/qstash";

const receiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
});

export default async function worker(req: VercelRequest, res: VercelResponse) {
  try {
    const rawBody = req.body;

    const isValid = await receiver.verify({
      signature: req.headers["upstash-signature"] as string,
      body: rawBody,
    });

    if (!isValid) {
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
