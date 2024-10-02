import { useEffect, useState } from "react";
import { visitas } from "../../mocks/visitas-mocks";
import { BiX } from "react-icons/bi";

import "./styles.scss";

export function ModalVisita({ id, fecharModal }) {
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
          <p>{visita.id}</p>
        </div>
      </div>
    )
  );
}
