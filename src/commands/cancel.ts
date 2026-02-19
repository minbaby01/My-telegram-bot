import { Context } from "grammy";
import { cancelDepositController } from "../controllers/empireController.js";
import { getErrorMessage } from "../utils/utils.js";
import { cancelSchema } from "../schemas/cancelSchema.js";

export const cancel = async (ctx: Context) => {
  const orderIds = ctx.match;

  try {
    const { data, success, error } = cancelSchema.safeParse({
      orderIds: orderIds,
    });

    if (!success) throw error.message;

    await cancelDepositController(data.orderIds);

    return await ctx.reply("Type `/status` to check");
  } catch (err) {
    return await ctx.reply(getErrorMessage(err));
  }
};
