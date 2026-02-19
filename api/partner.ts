import { VercelRequest, VercelResponse } from "@vercel/node";
import { bot } from "../src/bot.js";
import { CRYPTO_EXCHANGE } from "../src/constant/cryptoExchange.js";
import { isPostMethod } from "../src/guard/isPostMethod.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const adminId = process.env.ADMIN_ID;
    if (!adminId) throw new Error("Admin ID not found");

    const { success, message } = isPostMethod(req);
    if (!success) {
      return res.status(200).json({
        message: message,
      });
    }

    const body = req.body;

    const text = body.message;

    if (text) {
      await bot.api.sendMessage(adminId, text);
    }

    if (body.type === "new_coin" && body.exchange === CRYPTO_EXCHANGE.BINANCE) {
      await bot.api.sendMessage(adminId, text);
    }

    return res.status(200).json({
      message: "OK",
    });
  } catch (err) {
    return res.status(200).json({
      message: err,
    });
  }
}
