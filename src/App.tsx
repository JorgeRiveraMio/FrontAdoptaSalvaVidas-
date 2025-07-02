// src/App.tsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import { routes } from "@/config/routes";
import ScrollToTop from "./components/common/ScrollToTop";

// Importa los protectores
import RequireAdmin from "@/components/common/RequireAdmin";
import RequireNoAuth from "@/components/common/RequireNoAuth";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Todas las rutas se renderizan dentro de MainLayout */}
        <Route element={<MainLayout />}>
          {routes.map(({ path, component: Component }) => {
            // Ruta de ADMIN: envuelve en RequireAdmin
            if (path === "/admin") {
              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <RequireAdmin>
                      <Component />
                    </RequireAdmin>
                  }
                />
              );
            }

            // Rutas de login y registro: envuélvelas en RequireNoAuth
            if (path === "/iniciar-sesion" || path === "/registrarse") {
              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <RequireNoAuth>
                      <Component />
                    </RequireNoAuth>
                  }
                />
              );
            }

            // Resto de rutas sin protección adicional
            return <Route key={path} path={path} element={<Component />} />;
          })}
        </Route>
      </Routes>
    </>
  );
}
