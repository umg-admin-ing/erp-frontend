import { apiClient } from "../apiClient";

export async function getUsuarios() {
  const response = await apiClient.get("/api/usuarios");
  return response.data;
}