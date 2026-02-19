import { Context } from "grammy";
import { getInventoryController } from "../controllers/empireController.js";
import { getErrorMessage } from "../utils/utils.js";

export const inventory = async (ctx: Context) => {
  try {
    const inventory = await getInventoryController();
    return await ctx.reply(`${inventory}`);
  } catch (err) {
    return await ctx.reply(getErrorMessage(err));
  }
};
