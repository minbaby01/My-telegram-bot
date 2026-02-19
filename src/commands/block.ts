import { Context } from "grammy";
import { blockUserController } from "../controllers/empireController.js";
import { blockSchema } from "../schemas/blockSchema.js";
import { getErrorMessage } from "../utils/utils.js";

export const block = async (ctx: Context) => {
  const userId = ctx.match;

  try {
    const { data, success, error } = blockSchema.safeParse({
      steamId: userId,
    });

    if (!success) throw error.message;

    await blockUserController({ steamId: data.steamId });

    return await ctx.reply(`Blocked`);
  } catch (err) {
    return await ctx.reply(getErrorMessage(err));
  }
};
