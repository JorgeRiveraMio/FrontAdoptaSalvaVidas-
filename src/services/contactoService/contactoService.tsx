// src/services/contactoService.ts
import { makePostRequest } from "@/services/api";

export interface ContactoPayload {
  nombreCompleto: string;
  correoElectronico: string;
  telefono?: string;
  asunto?: string;
  mensaje: string;
}

export const enviarContacto = async (data: ContactoPayload) => {
  return await makePostRequest("/api/contacto", data);
};
