import { VercelRequest } from "@vercel/node";
import { MAX_DELAY } from "../constant";

export const guard = (req: VercelRequest) => {
  const adminId = process.env.ADMIN_ID;
  if (!adminId) throw new Error("Admin ID not found");

  const secretToken = process.env.TG_SECRET_TOKEN;
  if (!secretToken) throw new Error("Secret token not found");

  const secretTokenHeader = req.headers["x-telegram-bot-api-secret-token"];

  const body = req.body;

  if (secretTokenHeader !== secretToken) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  if (body.message.from.id != adminId) {
    return {
      success: false,
      message: "Hello guest",
    };
  }

  if (body.message?.date) {
    const messageTime = body.message.date * 1000;
    if (Date.now() - messageTime > MAX_DELAY) {
      return {
        success: false,
        message: "Skip message",
      };
    }
  }

  return {
    success: true,
    message: "",
  };
};
