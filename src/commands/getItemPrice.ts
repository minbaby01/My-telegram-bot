import { Context } from "grammy";
import { getItemPriceController } from "../controllers/steamController.js";
import { getErrorMessage } from "../utils/utils.js";
import { getItemPriceSchema } from "../schemas/getItemPriceSchema.js";

export const getItemPrice = async (ctx: Context) => {
  const itemName = ctx.match;

  try {
    const { data, success, error } = getItemPriceSchema.safeParse({
      itemName: itemName,
    });

    if (!success) throw error.message;
    const msg = await getItemPriceController(data.itemName);

    return await ctx.reply(msg);
  } catch (err) {
    return await ctx.reply(getErrorMessage(err));
  }
};
