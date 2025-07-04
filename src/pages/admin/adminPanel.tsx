// src/pages/admin/adminPanel.tsx
import { useState } from "react";
import Perritos from "./pages/perritos";
import Adopciones from "./pages/adopciones";
import User from "./pages/user";
import Dashboard from "./pages/dasboard";
import SolicitudesAdopcion from "./pages/solicitudesAdopcion";
import Donaciones from "./pages/donaciones/donaciones";

type Tab = "dashboard" | "perritos" | "adopciones"| "solicitudesAdopcion"| "usuarios" | "donaciones";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "perritos":
        return <Perritos />;
      case "solicitudesAdopcion":
        return <SolicitudesAdopcion />;
      case "adopciones":
        return <Adopciones />;  
      case "usuarios":
        return <User />;  
      case "donaciones":
         return <Donaciones />;      
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-red-800 text-white flex flex-col">
        <div className="p-4 flex flex-col items-center text-center border-b border-white/20">
          <img
            src="/ruta/foto.jpg"
            alt="Admin"
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
          <h2 className="text-lg font-semibold">Adopta Salva Vidas</h2>
          <p className="text-sm text-gray-200">User: Administrador</p>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === "dashboard"
                ? "bg-white text-red-800 font-semibold"
                : "hover:bg-red-700"
            }`}
          >
            🏠 Inicio
          </button>
          <button
            onClick={() => setActiveTab("perritos")}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === "perritos"
                ? "bg-white text-red-800 font-semibold"
                : "hover:bg-red-700"
            }`}
          >
            🐶 Perritos
          </button>
          <button
            onClick={() => setActiveTab("solicitudesAdopcion")}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === "solicitudesAdopcion"
                ? "bg-white text-red-800 font-semibold"
                : "hover:bg-red-700"
            }`}
          >
            📋 Solicitudes de Adopción
          </button>

          <button
            onClick={() => setActiveTab("adopciones")}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === "adopciones"
                ? "bg-white text-red-800 font-semibold"
                : "hover:bg-red-700"
            }`}
          >
            📋 Historial
          </button>

            <button
            onClick={() => setActiveTab("usuarios")}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === "usuarios"
                ? "bg-white text-red-800 font-semibold"
                : "hover:bg-red-700"
            }`}
          >
            👨‍🦱 Usuarios
          </button>
           <button
            onClick={() => setActiveTab("donaciones")}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === "donaciones"
                ? "bg-white text-red-800 font-semibold"
                : "hover:bg-red-700"
            }`}
          >
            💰 Donaciones
          </button>
        </nav>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-6 overflow-y-auto">{renderTab()}</main>
    </div>
  );
}
