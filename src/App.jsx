import { useEffect, useState } from "react";
import "./app.scss";

import { useNavigate } from "react-router-dom";

import { usuarioEstaLogado } from "./service/auth.js";
import { BiUser, BiX } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { CardVisita } from "./components/card-visita/index.jsx";
import { visitas } from "./mocks/visitas-mocks.jsx";

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
    <main className="pagina-visita">
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
            <h2 className="titulo-modal">Cadastro visita</h2>

            <BiX className="close-icon" onClick={fecharModal} />
          </div>
        </div>
      )}

      <section className="container-visitas">
        <div className="visitas">
          <h3 className="txt-confirmada">Confirmados</h3>

          <div className="container-cards">
            {visitas
              .filter((v) => v.status === "confirmado")
              .map((v) => {
                return (
                  <CardVisita
                    cliente={v.nomeCliente}
                    descricao={v.descricao}
                    status={v.status}
                  />
                );
              })}
          </div>
        </div>

        <div className="visitas">
          <h3 className="txt-finalizado">Finalizados</h3>

          <div className="container-cards">
            {visitas
              .filter((v) => v.status === "finalizado")
              .map((v) => {
                return (
                  <CardVisita
                    cliente={v.nomeCliente}
                    descricao={v.descricao}
                    status={v.status}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
}
