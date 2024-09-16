import { useEffect } from "react";
import "./app.scss";

import { useNavigate } from "react-router-dom";

import { usuarioEstaLogado } from "./service/auth.js";

export function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioEstaLogado()) navigate("/painel");
  }, []);

  return <h1>Home page</h1>;
}
