import { z } from "zod";

export const blockSchema = z.object({
  steamId: z
    .string()
    .min(5, { error: "Id to short" })
    .regex(/^\d+$/, { error: "Steam ID invalid" }),
});
