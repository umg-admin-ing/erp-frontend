import { apiClient } from "../apiClient";

export async function getUsuarioById(id) {
  const response = await apiClient.get(`/api/usuarios/${id}`);
  return response.data;
}