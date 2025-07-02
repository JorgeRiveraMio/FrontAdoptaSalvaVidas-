// src/services/authService.ts
import { makeGetRequest, makePostRequest } from "@/utils/api/api";
import { User } from "@/context/UserContext";

// Login y almacenamiento de token
export const login = async (
  email: string,
  password: string
): Promise<User> => {
  // Hacemos POST a /login/local usando la función centralizada
  const response = await makePostRequest("/login/local", { email, password });

  const token = response.jwt;
  if (token) {
    // Guardamos el JWT en localStorage
    localStorage.setItem("accessToken", token);

    // Luego obtenemos los datos del usuario actual
    const user = await getCurrentUser();
    return user;
  }

  throw new Error("Token inválido");
};

// Obtener usuario actual
export const getCurrentUser = async (): Promise<User> => {
  try {
    // Esta función hará GET /actual-usuario con el interceptor agregando el token
    return await makeGetRequest("/actual-usuario");
  } catch (error) {
    console.error("❌ Error al obtener usuario actual:", error);
    throw error;
  }
};

// Eliminar token en logout
export const logout = () => {
  localStorage.removeItem("accessToken");
};
