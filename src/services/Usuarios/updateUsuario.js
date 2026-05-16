import { apiClient } from "../apiClient";

export async function updateUsuario(id, usuario) {
  const response = await apiClient.put(`/api/usuarios/${id}`, usuario);
  return response.data;
}