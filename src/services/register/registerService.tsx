// src/services/registerService.ts
import { makePostRequest } from "@/utils/api/api";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  rol: { id: number };
}

export const sendRegisterCode = async (data: RegisterPayload): Promise<string> => {
  try {
    const response = await makePostRequest("/enviarCodigo", data);
    return response.message || "Código enviado.";
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error(error.response.data?.message || "Datos inválidos");
    }
    throw new Error("Error del servidor. Intenta más tarde.");
  }
};
