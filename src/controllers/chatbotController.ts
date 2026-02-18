import { Context } from "telegraf";
import { PROVIDER_CHATBOT } from "../constant/providerChatbot.js";
import { geminiService } from "../services/geminiSerivice.js";
import { textSchema } from "../schemas/textSchema.js";
import { getErrorMessage } from "../utils/utils.js";

export const chatbotController = async (ctx: Context) => {
  const provider = PROVIDER_CHATBOT.GEMINI;
  let response: string;

  const msg = ctx.text;

  const { data, success, error } = textSchema.safeParse({
    msg: msg,
  });

  if (!success) {
    return ctx.reply(error.message);
  }

  try {
    await ctx.sendChatAction("typing");

    switch (provider) {
      case PROVIDER_CHATBOT.GEMINI:
        response = await geminiService(data.msg);
        break;
      default:
        response = "Hello";
        break;
    }
  } catch (error) {
    response = getErrorMessage(error);
  }

  return ctx.reply(response, { parse_mode: "Markdown" });
};
