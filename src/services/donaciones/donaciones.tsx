import { User } from "@/context";

import {
  makeGetRequest

} from "@/services/api";
export enum TipoDonacion {
  DINERO = "DINERO"
 
}
export enum MetodoPago {
  MERCADO_PAGO = "MERCADO_PAGO",
}
export enum TipoDonante {
  PERSONA = "PERSONA",
  ORGANIZACION = "ORGANIZACION"
}

export interface Donacion {
  id: number;
  tipoDonacion: TipoDonacion; // e.g. "DINERO"
  monto?: number;             // Solo si tipoDonacion es DINERO
  descripcion?: string;
  fecha: string;              // ISO string (e.g. "2025-07-03T15:00:00Z")
  metodoPago?: MetodoPago;    // Solo si aplica
  mensaje?: string;
  usuario: User;           // Relación ManyToOne
  nombreDonante?: string;
  tipoDonante: TipoDonante;   // e.g. "PERSONA" o "ORGANIZACION"
}

export const fetchDonaciones = async (): Promise<Donacion[]> => {
  const res = await makeGetRequest("/api/donaciones");
  return Array.isArray(res) ? res as Donacion[] : [];
};
