import { apiClient } from "../apiClient";

export async function deleteUsuario(id) {
  const response = await apiClient.delete(`/api/usuarios/${id}`);
  return response.data;
}