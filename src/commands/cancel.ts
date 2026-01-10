import { Context } from "telegraf";
import { cancelDepositController } from "../controllers/empireController";
import { getErrorMessage } from "../utils";

export const cancel = async (ctx: Context) => {
  try {
    await cancelDepositController();

    return ctx.reply(`Cancel maybe OK`);
  } catch (err) {
    return ctx.reply(getErrorMessage(err));
  }
};
