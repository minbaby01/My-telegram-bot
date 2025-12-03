import { blockUserController } from "../controllers/empireController";
import { blockSchema } from "../schemas/blockSchema";
import { CustomContext } from "../types/context";
import { getErrorMessage } from "../utils";

export const block = async (ctx: CustomContext) => {
  const userId = ctx?.payload;

  try {
    const { data, success, error } = blockSchema.safeParse({
      steamId: userId,
    });

    if (!success) throw error.message;

    await blockUserController({ steamId: data.steamId });
    return ctx.reply(`Blocked Steam ID: ${data.steamId}`);
  } catch (err) {
    return ctx.reply(getErrorMessage(err));
  }
};
