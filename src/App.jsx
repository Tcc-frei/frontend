import { useEffect } from "react";
import "./app.scss";

import { useNavigate } from "react-router-dom";

import { usuarioEstaLogado } from "./service/auth.js";
import { BiUser } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";

export function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioEstaLogado()) navigate("/painel");
  }, []);

  return (
    <main>
      {/* <div className="info-admin">
        <span className="admin">administrador</span>
        <BiUser className="admin-img" />
      </div> */}

      <div className="cabecalho-visita">
        <h2 className="titulo-visita">Visitas</h2>

        <button className="btn-visita">
          <BsPlus /> criar nova visita
        </button>
      </div>
    </main>
  );
}
