import { Context } from "telegraf";
import { countController } from "../controllers/empireController";

export const count = async (ctx: Context) => {
  try {
    const count = await countController();

    return ctx.reply(`Item in stock: ${count}`);
  } catch (err) {
    return ctx.reply(`Count failed: ${err}`);
  }
};
