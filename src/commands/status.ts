import { Context } from "grammy";
import { getActiveDepositController } from "../controllers/empireController.js";
import { getErrorMessage } from "../utils/utils.js";

export const status = async (ctx: Context) => {
  try {
    const data = await getActiveDepositController();

    return ctx.reply(data);
  } catch (err) {
    return ctx.reply(getErrorMessage(err));
  }
};
