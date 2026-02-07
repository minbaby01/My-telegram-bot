import { VercelRequest, VercelResponse } from "@vercel/node";
import { bot } from "../src/index";
import { CRYPTO_EXCHANGE } from "../src/constant/cryptoExchange";
import { isPostMethod } from "../src/guard/isPostMethod";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { success, message } = isPostMethod(req);
    if (!success) {
      return res.status(200).json({
        message: message,
      });
    }

    const body = req.body;

    if (body.type === "new_coin" && body.exchange === CRYPTO_EXCHANGE.BINANCE) {
      const adminId = process.env.ADMIN_ID;
      if (!adminId) throw new Error("Admin ID not found");

      const text = body.message;
      await bot.telegram.sendMessage(adminId, text);
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
