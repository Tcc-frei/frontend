import { createBrowserRouter } from "react-router-dom";

import { Painel } from "./pages/painel";
import { App } from "./App"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/painel",
    element: <Painel />,
  },
]);
