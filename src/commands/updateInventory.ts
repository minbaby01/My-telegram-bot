import { Context } from "grammy";
import { updateInventoryController } from "../controllers/empireController.js";
import { getErrorMessage } from "../utils/utils.js";

export const updateInventory = async (ctx: Context) => {
  try {
    const msg = await updateInventoryController();

    return await ctx.reply(msg);
  } catch (err) {
    return await ctx.reply(getErrorMessage(err));
  }
};
