import { Context } from "telegraf";
import { getItemPriceController } from "../controllers/steamController";
import { getErrorMessage } from "../utils";

export const getItemPrice = async (ctx: Context) => {
  try {
    const itemPrice = await getItemPriceController();

    return ctx.reply(itemPrice);
  } catch (err) {
    return ctx.reply(getErrorMessage(err));
  }
};
