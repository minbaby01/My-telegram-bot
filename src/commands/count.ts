import { Context } from "telegraf";
// import { countController } from "../controllers/empireController";
import { getErrorMessage } from "../utils";

export const count = async (ctx: Context) => {
  try {
    // const count = await countController();
    // return ctx.reply(`Item in stock: ${count}`);
  } catch (err) {
    return ctx.reply(getErrorMessage(err));
  }
};
