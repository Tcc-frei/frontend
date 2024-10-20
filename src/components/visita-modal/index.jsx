import { useEffect, useState } from "react";

import "./styles.scss";
import { api } from "../../service/axios";

import { format } from "date-fns";
import { MapPin, User, X } from "lucide-react";
import { Link } from "react-router-dom";

export function ModalVisita({ id, fecharModal, onClick }) {
  const [visita, setVisita] = useState(null);

  useEffect(() => {
    async function pegarDetalhesVisita() {
      try {
        const resposta = await api.get(`/visita/${id}`);

        setVisita(resposta.data);
      } catch (e) {
        console.error(e);
      }
    }

    pegarDetalhesVisita();
  }, [id]);

  return (
    visita && (
      <div className="modal detalhe">
        <h2 className="titulo-modal">Detalhes do agendamento</h2>

        <X className="close-icon" onClick={fecharModal} />

        <div className="content-modal">
          <div className="user-info-container">
            <div className="user-info">
              <User className="user-icon" />

              <span className="user-cliente">{visita.cliente}</span>
            </div>

            <span className="horario">
              {format(visita.data, "d/M 'ás' hh:mm")}
            </span>
          </div>

          <div className="info-visita">
            <div className="info-container">
              <span className="info-nome">Logradouro:</span>

              <p className="">{visita.logradouro}</p>
            </div>

            <div className="info-container">
              <span className="info-nome">Bairro:</span>

              <p className="">{visita.bairro}</p>
            </div>

            <div className="info-container">
              <span className="info-nome">Localidade completa:</span>

              <Link
                className="info-cep"
                to={`https://www.google.com/maps/search/?api=1&query=${visita.cep}`}
                target="_blank"
              >
                {visita.cep} <MapPin color="white" size={18} />
              </Link>
            </div>
          </div>

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
