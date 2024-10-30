import { RouterProvider } from "react-router-dom";
import { rotasPrivadas } from "./routes/rotasPrivadas";
import { rotasPublicas } from "./routes/rotasPublicas";
import { useAuth } from "./hooks/useAuth";

export function Navegacao() {
  const { usuarioLogado } = useAuth();

  return (
    <RouterProvider router={usuarioLogado ? rotasPrivadas : rotasPublicas} />
  );
}
