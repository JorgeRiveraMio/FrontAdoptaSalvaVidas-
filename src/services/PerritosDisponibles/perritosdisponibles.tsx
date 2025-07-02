// src/services/PerritosDisponibles/perritosdisponibles.tsx
import { makeGetRequest } from "@/services/api";
import { PerritoDisponible } from "@/interfaces/PerritosDisponibles";

/**
 * Obtiene la lista de perritos disponibles para adopción.
 * Este endpoint es público.
 */
export const getPerritosDisponibles = async (): Promise<PerritoDisponible[]> => {
  return await makeGetRequest("/perro/disponibles");
};
