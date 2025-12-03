import { createDepositController } from "../controllers/empireController";
import { priceSchema } from "../schemas/priceSchema";
import { CustomContext } from "../types/context";
import { getErrorMessage } from "../utils";

export const deposit = async (ctx: CustomContext) => {
  const price = ctx?.payload;

  try {
    const { data, success, error } = priceSchema.safeParse({ price: price });

    if (!success) throw error.message;

    await createDepositController({ price: data.price });

    return ctx.reply(`Deposit ok, maybe fail`);
  } catch (err) {
    return ctx.reply(getErrorMessage(err));
  }
};
