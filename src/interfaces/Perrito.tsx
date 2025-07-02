// src/interfaces/Perrito.tsx

export default class Perrito {
  constructor(data: any) {
    this.id = data.id ?? null;
    this.nombre = data.nombre ?? "";
    this.edad = data.edad ?? 0;
    this.tamañoPerro = data.tamañoPerro ?? "";
    this.descripcion = data.descripcion ?? "";
    this.fechaIngreso = data.fechaIngreso ?? null; 
    this.disponible = data.disponible ?? true;
    this.imagenes = data.imagenes ?? [];
  }

  id: number | null;
  nombre: string;
  edad: number;
  tamañoPerro: string;
  descripcion: string;
  fechaIngreso: string | null;
  disponible: boolean;
  imagenes: { id?: number; url: string }[];

  static fromJson(json: any) {
    return new Perrito(json);
  }

  toPayload() {
    return {
      nombre: this.nombre,
      edad: this.edad,
      tamañoPerro: this.tamañoPerro,
      descripcion: this.descripcion,
      disponible: this.disponible,
      imagenes: this.imagenes.map((img) => ({ url: img.url })),
    };
  }

  toUpdatePayload() {
    return {
      id: this.id,
      nombre: this.nombre,
      edad: this.edad,
      tamañoPerro: this.tamañoPerro,
      descripcion: this.descripcion,
      disponible: this.disponible,
      imagenes: this.imagenes, // se incluye id en caso lo uses en backend
    };
  }
}
