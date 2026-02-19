import { Context } from "grammy";
import { PROVIDER_CHATBOT } from "../constant/providerChatbot.js";
import { geminiService, openRouterService } from "../services/gptSerivice.js";
import { textSchema } from "../schemas/textSchema.js";
import { getErrorMessage } from "../utils/utils.js";
import removeMd from "remove-markdown";

export const chatbotController = async (ctx: Context) => {
  const provider = PROVIDER_CHATBOT.OPEN_ROUTER;
  let response: string;

  const msg = ctx.message?.text;

  const { data, success, error } = textSchema.safeParse({
    msg: msg,
  });

  if (!success) {
    return ctx.reply(error.message);
  }

  try {
    await ctx.replyWithChatAction("typing");

    switch (provider) {
      // case PROVIDER_CHATBOT.GEMINI:
      //   response = await geminiService(data.msg);
      //   break;
      case PROVIDER_CHATBOT.OPEN_ROUTER:
        response = await openRouterService(data.msg);
        break;
      default:
        response = "Hello";
        break;
    }
  } catch (error) {
    response = getErrorMessage(error);
  }

  const removeMarkdown = removeMd(response);

  return ctx.reply(removeMarkdown);
};
