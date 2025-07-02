// src/utils/api/api.tsx
import axios from "axios";

// Obtenemos la URL base directamente de Vite
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  maxContentLength: 50 * 1024 * 1024, // hasta 50MB
  maxBodyLength: 50 * 1024 * 1024,    // hasta 50MB
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    // Axios 1.x: config.headers puede ser un objeto plano o una instancia de AxiosHeaders
    if (token) {
      if (config.headers && typeof config.headers.set === 'function') {
        // AxiosHeaders instance
        config.headers.set('Authorization', `Bearer ${token}`);
      } else if (config.headers) {
        // Plain object
        (config.headers as any)["Authorization"] = `Bearer ${token}`;
      } else {
        config.headers = { Authorization: `Bearer ${token}` } as any;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      // Solo redirige si no está ya en la página de login
      if (window.location.pathname !== "/iniciar-sesion") {
        window.location.assign("/iniciar-sesion");
      }
    }
    return Promise.reject(error);
  }
);

// ─── Funciones para llamar a la API ────────────────────────────────────────────

// GET
export const makeGetRequest = async (url: string, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};

// POST (JSON)
export const makePostRequest = async (url: string, data = {}) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
};

// PUT (JSON)
export const makePutRequest = async (url: string, data = {}) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error making PUT request:", error);
    throw error;
  }
};

// PATCH (JSON)
export const makePatchRequest = async (url: string, data = {}) => {
  try {
    const response = await api.patch(url, data);
    return response.data;
  } catch (error) {
    console.error("Error making PATCH request:", error);
    throw error;
  }
};

// DELETE
export const makeDeleteRequest = async (url: string) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error making DELETE request:", error);
    throw error;
  }
};

// POST con FormData (archivos)
export const makePostRequestFormData = async (url: string, formData: FormData) => {
  try {
    const response = await api.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error haciendo POST con FormData:", error);
    throw error;
  }
};

// PUT con FormData (archivos)
export const makePutRequestFormData = async (url: string, formData: FormData) => {
  try {
    const response = await api.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error haciendo PUT con FormData:", error);
    throw error;
  }
};

export { api };
