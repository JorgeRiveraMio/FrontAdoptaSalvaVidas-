// src/services/register/validateCodeService.ts
import { makePostRequest } from "../api";

export interface ValidateCodePayload {
  email: string;
  code: string;
}

export async function validateCode(payload: ValidateCodePayload) {
  return await makePostRequest("/validarCodigo", payload);
}
