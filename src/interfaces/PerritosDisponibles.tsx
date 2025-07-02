// src/interfaces/PerritosDisponibles.tsx
export interface ImagenPerrito {
  id: number;
  url: string;
}

export interface PerritoDisponible {
  id: number;
  nombre: string;
  edad: number;
  tamañoPerro: string;
  descripcion: string;
  disponible: boolean;
  imagenes: ImagenPerrito[];
}
