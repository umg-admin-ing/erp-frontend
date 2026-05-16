import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { clearAuth, getAuth } from "../utils/auth";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const auth = getAuth();
  const token = auth?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearAuth();
    }

    const data = error?.response?.data;

    let message = error?.message || "Error en la petición";

    if (typeof data === "string") {
      message = data;
    } else if (data?.message) {
      message = data.message;
    } else if (data) {
      message = JSON.stringify(data);
    }

    return Promise.reject(new Error(message));
  }
);