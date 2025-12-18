import { invoke } from "@tauri-apps/api/core";

export async function create(data: { name: string; description?: string }) {
  console.log("ewoiqk");
  return invoke("greet", { name: data.name }); // Replace with actual implementation
}
