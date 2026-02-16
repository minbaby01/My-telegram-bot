import { CustomContext } from "../types/context";
import { cancelDepositController } from "../controllers/empireController";
import { getErrorMessage } from "../utils";
import { cancelSchema } from "../schemas/cancelSchema";

export const cancel = async (ctx: CustomContext) => {
  const orderIds = ctx?.payload;

  try {
    const { data, success, error } = cancelSchema.safeParse({
      orderIds: orderIds,
    });

    if (!success) throw error.message;

    await cancelDepositController(data.orderIds);

    return ctx.reply("Type `/status` to check");
  } catch (err) {
    return ctx.reply(getErrorMessage(err));
  }
};
