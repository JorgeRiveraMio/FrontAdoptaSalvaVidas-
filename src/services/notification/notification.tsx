import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest
} from "@/services/api";

export interface Notificacion {
  id: number;
  mensaje: string;
  leida: boolean;
  fechaCreacion: string;
}



// Obtener todas las notificaciones por usuario
export const fetchNotificacionesByUsuario = async (usuarioId: number): Promise<Notificacion[]> => {
  try {
    const res = await makeGetRequest(`notificacion/usuario/${usuarioId}`);
    return res.map((n: any) => ({
      id: n.id,
      mensaje: n.mensaje,
      leida: n.leida,
      fechaCreacion: n.fechaCreacion,
    }));
  } catch (err) {
    console.error("Error al obtener notificaciones del usuario", err);
    return [];
  }
};

// Marcar una notificación como leída
export const marcarNotificacionComoLeida = async (id: number): Promise<boolean> => {
  try {
    await makePutRequest(`/notificacion/${id}/leer`);
    return true;
  } catch (err) {
    console.error("Error al marcar notificación como leída", err);
    return false;
  }
};

