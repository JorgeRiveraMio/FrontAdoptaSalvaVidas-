// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles/globals.css";
import 'aos/dist/aos.css';

import { BrowserRouter, useNavigate, useHref } from "react-router-dom";
import { Provider } from "@/provider";

// Wrapper que obtiene los hooks de React Router y los pasa a nuestro Provider
function AppWithProviders() {
  const navigate = useNavigate();
  const href = useHref;
  return (
    <Provider navigate={navigate} useHref={href}>
      <App />
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWithProviders />
    </BrowserRouter>
  </React.StrictMode>
);
