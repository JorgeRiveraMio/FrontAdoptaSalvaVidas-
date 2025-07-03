// src/interfaces/adopcion.interface.ts
export interface Adopcion {
  id: number;

  usuario: {
    id: number;
    name: string;
    email: string;
    username: string;
    rol: {
      id: number;
      name: string;
    };
  };

  perro: {
    id: number;
    nombre: string;
    edad: number;
    tamañoPerro: string;
    descripcion: string;
    disponible: boolean;
    imagenes: {
      id: number;
      url: string;
    }[];
  };

  fechaSolicitud: string;
  estado: string;
  comentario: string;

  nombreCompleto: string;
  telefono: string;
  direccion: string;
  tipoVivienda: string;

  tienePatios: boolean;
  viveEnFamilia: boolean;
  otrasMascotas: boolean;

  experienciaMascotas: string;
  tiempoDisponible: string;
  razonesAdopcion: string;
  condicionesAceptadas: boolean;
}

