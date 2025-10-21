import { z } from "zod";
import { LOWEST_PRICE } from "../constant";

export const priceSchema = z.object({
  price: z
    .string()
    .min(1)
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > LOWEST_PRICE;
      },
      {
        message: `Price must be a valid number greater than ${LOWEST_PRICE}`,
      }
    )
    .transform((val) => parseFloat(val)),
});
