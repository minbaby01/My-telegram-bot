import { z } from "zod";

export const getItemPriceSchema = z.object({
  itemName: z.string().min(3, { error: "Name too short" }),
});
