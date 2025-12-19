import { createSchema, listSchema } from "../schemas";

export type CreateRequestInput = z.infer<typeof createSchema>;
interface CreateProfileOutput {
  status: "success" | "error";
  profile?: Profile;
}

export type ListProfilesInput = z.infer<typeof listSchema>;
interface ListProfilesOutput {
  status: "success" | "error";
  profiles?: Profile[];
}
