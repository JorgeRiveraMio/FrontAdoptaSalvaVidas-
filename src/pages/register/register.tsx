// src/pages/register/register.tsx
import { useState } from "react";
import LogoHeader from "@/assets/image/home/Logo_header.png";
import ModalVerifyCode from "./ModalVerifyCode";
import { useRegisterForm } from "./useRegisterForm";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import dog_register from "@/assets/image/home/dog_register.jpg";
export default function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    form,
    error,
    successMsg,
    loading,
    handleChange,
    handleSubmit,
  } = useRegisterForm();

  const onSubmit = async (e: React.FormEvent) => {
    await handleSubmit(e);
    if (!error) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-7xl grid grid-cols-1 md:grid-cols-2">
        {/* === PANEL IZQUIERDO === */}
        <div className="p-10">
          <div className="flex justify-center md:justify-center">
            <img
              src={LogoHeader}
              alt="Logo Albergue Adopta Salva Vidas"
              className="h-16 w-400"
            />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 font-fam-desk text-center">
            ¡Únete y cambia vidas!
          </h2>
          <p className="text-gray-600 mb-8 font-fam-two text-center">
            Regístrate para ser parte de nuestra comunidad y ayudar a nuestros
            amigos peludos a encontrar un hogar lleno de amor.
          </p>

          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Escribe tu nombre completo"
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@correo.com"
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Crea una contraseña segura"
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">
                La contraseña debe tener al menos 8 caracteres.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 text-white rounded-full py-3 font-semibold hover:bg-red-800 transition flex items-center justify-center space-x-2"
            >
              <span>🐾</span>
              <span>{loading ? "Enviando..." : "Crear cuenta"}</span>
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/iniciar-sesion"
              className="text-red-700 hover:underline font-medium"
            >
              Inicia sesión
            </Link>
          </p>
        </div>

        {/* === PANEL DERECHO === */}
        <div className="relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${dog_register})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

          <div className="relative h-full flex flex-col justify-end p-10 text-white">
            <h3 className="text-2xl font-bold mb-2 flex items-center space-x-2">
              <span>❤️</span>
              <span>Cada registro hace la diferencia</span>
            </h3>
            <p className="max-w-xs">
              Al unirte a nuestra comunidad, ayudas a nuestros amigos de cuatro
              patas a encontrar un hogar lleno de amor y cuidado.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de código */}
      <ModalVerifyCode
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={form.email}
        onSuccess={() => {
          toast.success("Código verificado correctamente 🎉");
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
