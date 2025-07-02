// src/components/common/RequireAdmin.tsx
import { ReactNode, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

interface RequireAdminProps {
  children: ReactNode;
}

export default function RequireAdmin({ children }: RequireAdminProps) {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Mientras carga, no redirigimos
    if (loading) return;

    // Si ya terminó la carga y no hay usuario o no es admin, redirigir
    if (!user || user.rol.id !== 1) {
      navigate("/iniciar-sesion");
    }
  }, [user, loading, navigate]);

  // Hasta que termine “loading” y compruebe, no mostramos nada
  if (loading || !user || user.rol.id !== 1) {
    return null;
  }

  // Si es admin, renderiza children
  return <>{children}</>;
}
