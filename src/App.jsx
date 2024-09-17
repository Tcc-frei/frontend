import { useEffect, useState } from "react";
import "./app.scss";

import { useNavigate } from "react-router-dom";

import { usuarioEstaLogado } from "./service/auth.js";
import { BiUser, BiX } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";

export function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  function abrirModal() {
    setModalIsOpen(true);
  }

  function fecharModal() {
    setModalIsOpen(false);
  }

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

        <button className="btn-visita" onClick={abrirModal}>
          <BsPlus /> criar nova visita
        </button>
      </div>

      {modalIsOpen && (
        <div className="container-modal">
          <div className="modal">
            <h2>Cadastro visita</h2>

            <BiX className="close-icon" onClick={fecharModal} />
          </div>
        </div>
      )}
    </main>
  );
}
