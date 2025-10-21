import { Context } from "telegraf";
import { cancelDepositController } from "../controllers/empireController";

export const cancel = async (ctx: Context) => {
  try {
    await cancelDepositController();

    return ctx.reply(`Cancel OK`);
  } catch (err) {
    return ctx.reply(`Cance failed: ${err}`);
  }
};
