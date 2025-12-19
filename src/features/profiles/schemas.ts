import { z } from "zod";

export const createSchema = z
  .object({
    name: z.string().min(1, "name-required"),
    description: z.string().optional(),
  })
  .required();

export const listSchema = z.object({
  search: z
    .object({
      in: z.array(z.string()).optional(),
      text: z.string().min(1, "search-text-required"),
    })
    .optional(),
  fields: z.array(z.string()).optional(),
  populate: z.array(z.string()).optional(),
  count: z.number().min(1).max(100).optional(),
  page: z.number().min(0).optional(),
});
