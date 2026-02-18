import { z } from "zod";
import { STRING_NUMBER_REGEX } from "../constant/constant.js";

export const blockSchema = z.object({
  steamId: z
    .string()
    .min(5, { error: "Id to short" })
    .regex(STRING_NUMBER_REGEX, { error: "Steam ID invalid" }),
});
