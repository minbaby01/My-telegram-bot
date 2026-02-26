import { z } from "zod";

export const textSchema = z.object({
  msg: z.string().min(3, { error: "Text to short" }),
});
