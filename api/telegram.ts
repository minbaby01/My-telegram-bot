import { VercelRequest, VercelResponse } from "@vercel/node";
import { bot } from "../src/bot.js";
import { guard } from "../src/guard/guard.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { success, message } = guard(req);
    if (!success) {
      return res.status(200).json({
        message: message,
      });
    }

    const body = req.body;

    await bot.handleUpdate(body);

    return res.status(200).json({
      message: "OK",
    });
  } catch (err) {
    return res.status(200).json({
      message: err,
    });
  }
}
