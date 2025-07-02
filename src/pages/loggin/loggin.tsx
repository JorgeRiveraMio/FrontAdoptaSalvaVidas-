// src/pages/loggin/loggin.tsx
import { useState } from "react";
import { login } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import LogoHeader from "@/assets/image/home/Logo_header.png";
import { Link } from "react-router-dom";
import dog_ini from "@/assets/image/home/dog_ini.jpg";

export default function Loggin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await login(email, password);
      setUser(user);
      navigate("/");
    } catch (err: any) {
      if (err.response?.status === 401 || err.message?.includes("incorrectos")) {
        setError("Correo o contraseña incorrectos.");
      } else {
        setError("Error del servidor. Intenta más tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-7xl w-full grid grid-cols-1 md:grid-cols-2">
        {/* PANEL IZQUIERDO */}
        <div className="p-10">
          <div className="flex justify-center md:justify-center">
            <img
              src={LogoHeader}
              alt="Logo Albergue Adopta Salva Vidas"
              className="h-16 w-400"
            />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 font-fam-desk text-center">
            ¡Bienvenido de nuevo!
          </h2>
          <p className="text-gray-600 mb-8 font-fam-two text-center text-base">
            Un hogar para cada pata
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center text-gray-600">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-red-600"
                />
                <span className="ml-2">Recordarme</span>
              </label>
              <a href="#" className="text-red-700 hover:underline font-medium">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-full py-3 font-semibold transition ${
                isLoading
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-700 hover:bg-red-800 text-white"
              }`}
            >
              {isLoading ? "Cargando..." : "Entrar"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/registrarse"
              className="text-red-700 hover:underline font-medium"
            >
              Regístrate
            </Link>
          </p>
        </div>

        {/* PANEL DERECHO */}
        <div className="relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${dog_ini})`,
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
    </div>
  );
}
