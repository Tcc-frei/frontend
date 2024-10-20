import { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
import { api } from "../../service/axios";
import { User } from "lucide-react";

import { format } from "date-fns";

import "./styles.scss";
import { CardServico } from "../card-servico";

export function ModalOrcamentoDetalhes({ fecharModal, id }) {
  const [orcamento, setOrcamento] = useState(null);
  const [servicosOrcamento, setServicosOrcamentos] = useState([]);

  useEffect(() => {
    async function pegarOrcamentoPeloId(id) {
      try {
        const resposta = await api.get(`/orcamento/${id}`);

        const { orcamento, servicos } = resposta.data;

        setOrcamento(orcamento);
        setServicosOrcamentos(servicos);
      } catch (error) {
        console.log(error);
      }
    }

    pegarOrcamentoPeloId(id);
  }, []);

  return (
    <div className="modal detalhe orcamento">
      <h1 className="titulo-modal">Detalhes do orçamento</h1>

      <BiX className="close-icon" onClick={fecharModal} />
      {orcamento && (
        <div className="content-modal">
          <div className="user-info-container">
            <div className="user-info">
              <User />
              <span>{orcamento.cliente}</span>
            </div>

            <span className="orcamento-horario">
              {format(orcamento.data, "d/M")} -{" "}
              {format(orcamento.data, "HH:MM")}
            </span>
          </div>

          <div className="info-orcamento">
            <div className="container-situacao">
              <span>Situação:</span>

              <p className="info-status">
                {orcamento.status === "pendente"
                  ? "Aguardando aprovação do cliente"
                  : "Orçamento aprovado"}
              </p>
            </div>

            <div className="container-situacao">
              <span>Preço final:</span>

              <p className="total">R$ {orcamento.total.replace(".", ",")}</p>
            </div>

            <div className="container-situacao">
              <div className="descricao-container">
                <span>Observação:</span>
                <p className="descricao-orcamento">{orcamento.descricao}</p>
              </div>
            </div>

            <div className="container-situacao">
              <div className="servicos">
                <span>Servicos solicitados:</span>

                <div className="container-servicos">
                  {servicosOrcamento.map((servico) => {
                    return <CardServico servico={servico} />;
                  })}
                </div>
              </div>
            </div>

            <div className="container-buttons">
              <button className="btn aprovar" type="button">
                Aprovar orçamento
              </button>
              <button type="button" className="btn excluir">
                Excluir orçamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
