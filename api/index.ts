import { VercelRequest, VercelResponse } from "@vercel/node";
import { bot } from "../src/index";
import { guard } from "../src/guard";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { success, message } = guard(req);
    if (!success) {
      return res.status(200).json({
        message: message,
      });
    }

    const body = req.body;

    if (req.method === "POST") {
      await bot.handleUpdate(body);
      return res.status(200).json({
        message: "OK",
      });
    }

    return res.status(200).json({
      message: "Hello",
    });
  } catch (err) {
    return res.status(200).json({
      message: err,
    });
  }
}
