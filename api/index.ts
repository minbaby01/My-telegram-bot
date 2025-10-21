import { VercelRequest, VercelResponse } from "@vercel/node";
import { bot } from "../src/index";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const adminId = process.env.ADMIN_ID;
    const secret = process.env.TG_SECRET_TOKEN;
    const headerToken = req.headers["x-telegram-bot-api-secret-token"];

    if (headerToken !== secret) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.body.message.from.id != adminId) {
      return res.status(200).json({
        message: "Hello",
      });
    }

    if (req.method === "POST") {
      await bot.handleUpdate(req.body);
      return res.status(200).json({
        message: "OK",
      });
    }

    return res.status(200).json({
      message: "Hello guest",
    });
  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).json({
      error: "Error",
    });
  }
}
