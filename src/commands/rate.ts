import { Context } from "telegraf";
import { getErrorMessage } from "../utils";
import { getUsdRateController } from "../controllers/moneyController";

export const rate = async (ctx: Context) => {
  try {
    const data = await getUsdRateController();

    return ctx.reply(data);
  } catch (err) {
    return ctx.reply(getErrorMessage(err));
  }
};
