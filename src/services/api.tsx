// src/services/api.ts
import axios from "axios";

// Obtener la URL base desde .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  maxContentLength: 50 * 1024 * 1024,
  maxBodyLength: 50 * 1024 * 1024,
});

// Agrega automáticamente el token JWT desde localStorage
const getAuthHeader = (): { Authorization?: string } => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// GET
export const makeGetRequest = async (url: string, params: object = {}) => {
  const response = await api.get(url, {
    params,
    headers: getAuthHeader(),
  });
  return response.data;
};

// POST
export const makePostRequest = async (url: string, data: object = {}) => {
  const response = await api.post(url, data, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// PUT
export const makePutRequest = async (url: string, data: object = {}) => {
  const response = await api.put(url, data, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// PATCH
export const makePatchRequest = async (url: string, data: object = {}) => {
  const response = await api.patch(url, data, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// DELETE
export const makeDeleteRequest = async (url: string) => {
  const response = await api.delete(url, {
    headers: getAuthHeader(),
  });
  return response.data;
};
