import React, { useEffect, useState } from "react";
import {Notificacion, fetchNotificacionesByUsuario, marcarNotificacionComoLeida } from "@/services/notification/notification";


interface Props {
  usuarioId: number;
}

const notificationDropdown: React.FC<Props> = ({ usuarioId }) => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      const notis = await fetchNotificacionesByUsuario(usuarioId);
      setNotificaciones(notis);
    };
    cargar();
  }, [usuarioId]);

  const marcarLeida = async (id: number) => {
    const ok = await marcarNotificacionComoLeida(id);
    if (ok) {
      setNotificaciones(prev =>
        prev.map(n => (n.id === id ? { ...n, leida: true } : n))
      );
    }
  };

  const noLeidas = notificaciones.filter(n => !n.leida).length;

  return (
    <div className="relative">
      <button onClick={() => setMostrar(!mostrar)} className="relative">
        🔔
        {noLeidas > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {noLeidas}
          </span>
        )}
      </button>

      {mostrar && (
        <div className="absolute right-0 mt-2 w-72 bg-white border rounded shadow-lg z-10">
          <div className="p-2 text-sm font-bold border-b">Notificaciones</div>
          <ul>
            {notificaciones.length === 0 && (
              <li className="p-2 text-sm text-gray-500">No hay notificaciones.</li>
            )}
            {notificaciones.map(n => (
              <li
                key={n.id}
                onClick={() => !n.leida && marcarLeida(n.id)}
                className={`p-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  n.leida ? "text-gray-500" : "font-semibold"
                }`}
              >
                {n.mensaje}
                <div className="text-xs text-gray-400">{new Date(n.fechaCreacion).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default notificationDropdown;
