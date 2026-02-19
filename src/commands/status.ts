import { Context } from "grammy";
import { getActiveDepositController } from "../controllers/empireController.js";
import { getErrorMessage } from "../utils/utils.js";

export const status = async (ctx: Context) => {
  try {
    const data = await getActiveDepositController();

    return await ctx.reply(data);
  } catch (err) {
    return await ctx.reply(getErrorMessage(err));
  }
};
