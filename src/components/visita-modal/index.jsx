import { useEffect, useState } from "react";
import { visitas } from "../../mocks/visitas-mocks";
import { BiUser, BiX } from "react-icons/bi";

import "./styles.scss";

export function ModalVisita({ id, fecharModal, onClick }) {
  const [visita, setVisita] = useState(null);

  useEffect(() => {
    function pegarDetalhesVisita() {
      const visita = visitas.find((v) => v.id === id);
      setVisita(visita);
    }

    pegarDetalhesVisita();
  }, [id]);

  return (
    visita && (
      <div className="modal detalhe">
        <h2 className="titulo-modal">Detalhes do agendamento</h2>

        <BiX className="close-icon" onClick={fecharModal} />

        <div className="content-modal">
          <div className="user-info">
            <BiUser className="user-icon" />

            <span className="user-cliente">{visita.cliente}</span>
          </div>

          <p className="descricao">{visita.descricao}</p>

          <div className="container-buttons">
            <button className="btn excluir">Excluir agendamento</button>
            <button className="btn salvar" onClick={onClick}>
              Fazer orçamento
            </button>
          </div>
        </div>
      </div>
    )
  );
}
