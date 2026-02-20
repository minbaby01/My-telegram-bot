import { verifySignature } from "@upstash/qstash/nextjs";
import { cb } from "../src/bot.js";
import { VercelRequest, VercelResponse } from "@vercel/node";

const worker = async (req: VercelRequest, res: VercelResponse) => {
  return await cb(req, res);
};

export default verifySignature(worker);

export const config = {
  maxDuration: 60,
  api: {
    bodyParser: false,
  },
};
