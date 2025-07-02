// src/services/perritosService/perrito.ts

import Perrito from "@/interfaces/Perrito";
import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest
} from "@/services/api";

// Listar todos los perritos
export const fetchPerritos = async (): Promise<Perrito[]> => {
  const res = await makeGetRequest("/perro/listar");
  return Array.isArray(res) ? res.map(Perrito.fromJson) : [];
};


// Obtener uno por ID (opcional, si tu backend lo soporta)
export const fetchPerritoById = async (id: number): Promise<Perrito | null> => {
  try {
    const res = await makeGetRequest(`/perro/${id}`);
    return Perrito.fromJson(res);
  } catch (err) {
    console.error("Error al obtener perrito por ID", err);
    return null;
  }
};

// Crear un perrito
export const createPerrito = async (perrito: Perrito) => {
  const payload = perrito.toPayload();
  return await makePostRequest("/perro/registrar", payload);
};

// Eliminar perrito por ID
export const deletePerrito = async (id: number) => {
  return await makeDeleteRequest(`/perro/${id}`);
};

// Actualizar perrito (si tienes PUT implementado más adelante)
export const updatePerrito = async (perrito: Perrito) => {
  const payload = perrito.toUpdatePayload();
  return await makePutRequest(`/perro/actualizar`, payload);
};
