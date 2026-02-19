import { VercelRequest } from "@vercel/node";
import { MAX_DELAY } from "../constant/constant.js";
import { isPostMethod } from "./isPostMethod.js";

export const guard = (req: VercelRequest) => {
  const { success, message } = isPostMethod(req);
  if (!success) {
    return {
      success: false,
      message: message,
    };
  }

  const adminId = process.env.ADMIN_ID;
  if (!adminId) throw new Error("Admin ID not found");

  const body = req.body;

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
