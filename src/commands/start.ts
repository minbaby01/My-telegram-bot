import { Context } from "grammy";

export const start = async (ctx: Context) => {
  const text = "@korumox";
  return ctx.reply(text);
};
