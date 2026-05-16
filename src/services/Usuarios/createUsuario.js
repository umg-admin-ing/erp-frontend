import { apiClient } from "../apiClient";

export async function createUsuario(usuario) {
  const response = await apiClient.post("/api/usuarios", usuario);
  return response.data;
}