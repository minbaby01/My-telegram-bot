import { Context } from "telegraf";
import { PROVIDER_CHATBOT } from "../constant/providerChatbot";
import { geminiService } from "../services/geminiSerivice";
import { textSchema } from "../schemas/textSchema";
import { getErrorMessage } from "../utils";

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

  return ctx.reply(response);
};
