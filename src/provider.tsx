// src/provider.tsx
import { HeroUIProvider } from "@heroui/system";
import { UserProvider } from "@/context/UserContext";

interface ProviderProps {
  children: React.ReactNode;
  navigate: ReturnType<typeof import("react-router-dom").useNavigate>;
  useHref: typeof import("react-router-dom").useHref;
}

export function Provider({ children, navigate, useHref }: ProviderProps) {
  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <UserProvider>{children}</UserProvider>
    </HeroUIProvider>
  );
}
