import { Context } from "telegraf";
import { getItemPriceController } from "../controllers/steamController";
import { getErrorMessage } from "../utils";
import { getItemPriceSchema } from "../schemas/getItemPriceSchema";

export const getItemPrice = async (ctx: Context) => {
  const itemNameList = process.env.ITEM_NAME_LIST?.split(",");

  try {
    const { data, success, error } = getItemPriceSchema.safeParse({
      itemNameList: itemNameList,
    });

    if (!success) throw error.message;
    const msg = await getItemPriceController(data.itemNameList);

    return ctx.reply(msg, {
      parse_mode: "HTML",
    });
  } catch (err) {
    return ctx.reply(getErrorMessage(err));
  }
};
