import { VercelRequest, VercelResponse } from "@vercel/node";
import { cb } from "../src/bot.js";
import { guard } from "../src/guard/guard.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { success, message } = guard(req);
    if (!success) {
      return res.status(200).json({
        message: message,
      });
    }

    await cb(req, res);

    return res.status(200).json({
      message: "OK",
    });
  } catch (err) {
    console.error(err);
    return res.status(200).json({
      message: err,
    });
  }
}
