import { Context } from "grammy";
import { getItemPriceController } from "../controllers/steamController.js";
import { getErrorMessage } from "../utils/utils.js";
import { getItemPriceSchema } from "../schemas/getItemPriceSchema.js";

export const get = async (ctx: Context) => {
  const itemNameList = process.env.ITEM_NAME_LIST;

  try {
    const { data, success, error } = getItemPriceSchema.safeParse({
      itemNameList: itemNameList,
    });

    if (!success) throw error.message;
    const msg = await getItemPriceController(data.itemNameList);

    return ctx.reply(msg);
  } catch (err) {
    return ctx.reply(getErrorMessage(err));
  }
};
