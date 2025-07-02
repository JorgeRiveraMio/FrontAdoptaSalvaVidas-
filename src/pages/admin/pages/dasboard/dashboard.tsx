// src/pages/admin/pages/dashboard.tsx

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Bienvenida */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-2">Bienvenido al panel del administrador</h1>
        <p className="text-gray-700">
          Aquí puedes gestionar el sistema de Adopta Salva Vidas con facilidad y seguridad.
        </p>
      </div>

      {/* Sección de funciones */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">¿Qué puedes hacer aquí?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Gestionar el perfil de los perritos (crear, editar, eliminar).</li>
          <li>Revisar y aprobar solicitudes de adopción.</li>
        </ul>
      </div>

    </div>
  );
}
