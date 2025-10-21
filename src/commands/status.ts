import { Context } from "telegraf";
import { getActiveDepositController } from "../controllers/empireController";

export const status = async (ctx: Context) => {
  try {
    const data = await getActiveDepositController();

    return ctx.reply(data);
  } catch (err) {
    return ctx.reply(`Get status failed: ${err}`);
  }
};
