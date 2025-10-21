import { Context } from "telegraf";
import { getItemPriceController } from "../controllers/steamController";

export const getItemPrice = async (ctx: Context) => {
  try {
    const itemPrice = await getItemPriceController();

    return ctx.reply(itemPrice);
  } catch (err) {
    return ctx.reply(`Get item price failed: ${err}`);
  }
};
