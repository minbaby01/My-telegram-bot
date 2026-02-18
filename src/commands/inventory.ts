import { Context } from "telegraf";
import { getInventoryController } from "../controllers/empireController.js";
import { getErrorMessage } from "../utils/utils.js";

export const inventory = async (ctx: Context) => {
  try {
    const inventory = await getInventoryController();
    return ctx.reply(`${inventory}`);
  } catch (err) {
    return ctx.reply(getErrorMessage(err));
  }
};
