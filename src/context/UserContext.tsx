// src/context/UserContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/services/authService";

export interface User {
  id: number;
  name: string;
  email: string;
  rol: { id: number; name: string };
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setLoading(false);
      return;
    }

    getCurrentUser()
      .then(setUser)
      .catch((err) => {
        console.error("❌ Error en UserContext:", err);
        setUser(null); // limpia si hay token inválido
      })
      .finally(() => setLoading(false)); // evitar spinner infinito
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
