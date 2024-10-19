import { createBrowserRouter } from "react-router-dom";

import { App } from "./App";
import { Painel } from "./pages/painel";
import { OrcamentoPage } from "./pages/orcamentos";

export const router = createBrowserRouter([
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
