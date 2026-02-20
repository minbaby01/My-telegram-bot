import { VercelRequest, VercelResponse } from "@vercel/node";
import { guard } from "../src/guard/guard.js";
import { qstash } from "../src/lib/qstash.js";
import { QSTASH_TIME_OUT } from "../src/constant/constant.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { success, message } = guard(req);
    if (!success) {
      return res.status(200).json({
        message: message,
      });
    }

    const host = req.headers.host;
    const workerUrl = `https://${host}/api/worker`;

    await qstash.publishJSON({
      url: workerUrl,
      body: req.body,
      timeout: QSTASH_TIME_OUT,
    });

    return res.status(200).json({
      message: "Received",
    });
  } catch (err) {
    console.error(err);
    return res.status(200).json({
      message: err,
    });
  }
}
