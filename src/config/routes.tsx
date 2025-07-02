// src/config/routes.tsx
import Home from "@/pages/home";
import Mission from "@/pages/mission";
import Loggin from "@/pages/loggin";
import Adopt from "@/pages/adopt";
import Register from "@/pages/register";
import Contacto from "@/pages/aboutus";
import AdminPanel from "@/pages/admin";
import Voluntariado from "@/pages/voluntariado/Voluntariado";
import Privacity from "@/components/support/Privacity";
import NotFound from "@/pages/notfound/notfound";

export interface AppRoute {
  name?: string;
  path: string;
  component: React.FC;
}

// La ruta de admin la ponemos al final (solo accesible si es admin)
export const routes: AppRoute[] = [
  { name: "Inicio",      path: "/",             component: Home },
  { name: "Adoptar",      path: "/adopta",       component: Adopt },
  { name: "Albergue",      path: "/mision",       component: Mission },
  { name: "Voluntariado",       path: "/voluntariado",        component: Voluntariado },
  { name: "Contacto",    path: "/contacto",     component: Contacto },
  { name: "Politicas",    path: "/politicas-privacidad",     component: Privacity },
  { name: "Iniciar Sesión", path: "/iniciar-sesion", component: Loggin },
  { name: "Registrarse",   path: "/registrarse",    component: Register },
  { name: "Admin",       path: "/admin",        component: AdminPanel },
  { name: "Not Found",   path: "*",             component: NotFound }
];
