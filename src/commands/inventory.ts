import { Context } from "telegraf";
import { getInventoryController } from "../controllers/empireController";
import { getErrorMessage } from "../utils";

export const inventory = async (ctx: Context) => {
  try {
    const inventory = await getInventoryController();
    return ctx.reply(`${inventory}`);
  } catch (err) {
    return ctx.reply(getErrorMessage(err));
  }
};
