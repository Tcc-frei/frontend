import { createBrowserRouter } from "react-router-dom";

import { Painel } from "../pages/painel";

export const rotasPublicas = createBrowserRouter([
  {
    path: "/*",
    element: <Painel />,
  },
]);
