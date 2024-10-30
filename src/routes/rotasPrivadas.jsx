import { createBrowserRouter } from "react-router-dom";
import { App } from "../App.jsx";
import { OrcamentoPage } from "../pages/orcamentos";
import { Painel } from "../pages/painel";

export const rotasPrivadas = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/orcamentos",
    element: <OrcamentoPage />,
  },
  {
    path: "/painel",
    element: <Painel />,
  },
]);
