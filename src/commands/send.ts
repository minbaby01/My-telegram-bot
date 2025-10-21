import { Context } from "telegraf";
import { createAndConfirmTradeOfferController } from "../controllers/steamController";

export const send = async (ctx: Context) => {
  try {
    await createAndConfirmTradeOfferController();

    return ctx.reply("Send OK");
  } catch (err) {
    return ctx.reply(`Send failed: ${err}`);
  }
};
