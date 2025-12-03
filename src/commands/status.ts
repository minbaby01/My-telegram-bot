import { Context } from "telegraf";
import { getActiveDepositController } from "../controllers/empireController";
import { getErrorMessage } from "../utils";

export const status = async (ctx: Context) => {
  try {
    const data = await getActiveDepositController();

    return ctx.reply(data);
  } catch (err) {
    return ctx.reply(getErrorMessage(err));
  }
};
