import { z } from "zod";
import { STRING_NUMBER_REGEX } from "../constant/constant.js";

export const cancelSchema = z.object({
  orderIds: z
    .string()
    .transform((val) => {
      return val
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id !== "" && STRING_NUMBER_REGEX.test(id))
        .map(Number);
    })
    .refine((ids) => ids.length > 0, {
      message: "Invalid ids",
    }),
});
