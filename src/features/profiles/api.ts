import { invoke } from "@tauri-apps/api/core";
import { Profile } from "./feature-types";

interface CreateProfileInput {
  name: string;
  description?: string;
}
interface CreateProfileOutput {
  status: "success" | "error";
  profile?: Profile;
}
export async function create(
  data: CreateProfileInput,
): Promise<CreateProfileOutput> {
  const result = invoke<CreateProfileOutput>("profiles_create_command", {
    input: data,
  });

  if (!result) {
    return { status: "error" };
  }

  return result;
}
