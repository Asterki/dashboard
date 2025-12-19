import { invoke } from "@tauri-apps/api/core";

import type { APITypes, ModelTypes } from ".";

export async function create(
  data: APITypes.CreateRequestInput,
): Promise<APITypes.CreateProfileOutput> {
  const result = invoke<APITypes.CreateProfileOutput>(
    "profiles_create_command",
    {
      input: data,
    },
  );

  if (!result) {
    return { status: "error" };
  }

  return result;
}

// List
export async function list(): Promise<APITypes.ListProfilesOutput> {
  const result = await invoke<APITypes.ListProfilesOutput>(
    "profiles_list_command",
  );

  if (!result) {
    return { status: "error" };
  }

  console.log(result);

  return result;
}
