import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";

import { createRoot } from "react-dom/client";
import "./index.css";

import { Navegacao } from "./navegacao.jsx";
import { AuthProvider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Navegacao />
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
