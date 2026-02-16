import { z } from "zod";

export const getItemPriceSchema = z.object({
  itemNameList: z
    .string()
    .transform((val) => {
      return val.split(",").map((itemName) => itemName.trim());
    })
    .refine((itemNameList) => itemNameList.length > 0, {
      message: "Invalid item name",
    }),
});
