import { z } from "zod";

export const createSchema = z.object({
  name: z.string().min(1, "name-required"),
  description: z.string().optional(),
});
export type CreateRequestBody = z.infer<typeof createSchema>;
