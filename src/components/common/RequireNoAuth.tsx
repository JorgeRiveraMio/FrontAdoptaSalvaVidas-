// src/components/common/RequireNoAuth.tsx
import { ReactNode, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

interface RequireNoAuthProps {
  children: ReactNode;
}

export default function RequireNoAuth({ children }: RequireNoAuthProps) {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    // Si ya hay un user (está autenticado), redirigimos a "/"
    if (user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading || user) {
    // Mientras carga o si ya hay usuario, no renderizamos el children
    return null;
  }

  return <>{children}</>;
}
