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
    console.log("Respuesta original del backend:", notis);
    setNotificaciones(notis); // ✅ sin map ni transformación
  };

  cargar();
}, [usuarioId]);


 const marcarLeida = async (id: number) => {
  const ok = await marcarNotificacionComoLeida(id);
  if (ok) {
    setNotificaciones(prev =>
      prev.map(n => (n.id === id ? { ...n, leida: 1 } : n)) // ✅ aquí
    );
  }
};

  const noLeidas = notificaciones.filter(n => !n.leido).length;

  return (
    <div className="relative">
      <button onClick={() => setMostrar(!mostrar)} className="relative">
        🔔
        {noLeidas > 0 && (
        <span className="bg-red-500 text-white rounded-full px-2 text-xs">
        {noLeidas > 0 ? noLeidas : ""}
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
        onClick={() => !n.leido && marcarLeida(n.id)}
        className={`p-2 text-sm cursor-pointer hover:bg-gray-100 rounded ${
            n.leido
            ? "text-gray-500 bg-white"
            : "font-semibold text-black bg-yellow-100"
        }`}
        >
        {n.mensaje}
        <div className="text-xs text-gray-400">
            {new Date(n.fechaCreacion).toLocaleString()}
        </div>
        </li>

            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default notificationDropdown;
