import { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
import { api } from "../../service/axios";
import { User } from "lucide-react";

import { format } from "date-fns";

import "./styles.scss";
import { CardServico } from "../card-servico";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function ModalOrcamentoDetalhes({ fecharModal, id }) {
  const [orcamento, setOrcamento] = useState(null);
  const [servicosOrcamento, setServicosOrcamentos] = useState([]);

  const navigate = useNavigate();

  async function deletarOrcamento(id) {
    try {
      await api.delete(`/orcamento/${id}`);

      toast.success("Orçamento deletado", {
        position: "top-right",
      });

      navigate(0);
    } catch (e) {
      console.log(e);
    }
  }

  async function atualizarStatusOrcamento(id) {
    try {
      await api.get(`/orcamento/status/${id}`);

      toast.success("Status atualizado com sucesso !", {
        position: "top-right",
      });

      fecharModal();
      navigate(0);
    } catch (erro) {
      console.log(erro);
    }
  }

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

  useEffect(() => {
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
              {format(orcamento.data, "HH:mm")}
            </span>
          </div>

          <div className="info-orcamento">
            <div className="container-situacao">
              <span>Situação:</span>

              <p className="info-status">
                <div
                  className={`status ${
                    orcamento.status == "pendente" ? "pendente" : "aprovado"
                  }`}
                ></div>

                {orcamento.status === "pendente"
                  ? "Aguardando aprovação do cliente"
                  : "Aprovado"}
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
              <button
                type="button"
                className="btn"
                onClick={() => deletarOrcamento(orcamento.id)}
              >
                Excluir orçamento
              </button>
              {orcamento.status === "pendente" ? (
                <button
                  className="btn aprovar"
                  type="button"
                  onClick={() => atualizarStatusOrcamento(orcamento.id)}
                >
                  Aprovar orçamento
                </button>
              ) : (
                <button className="btn aprovar" type="button">
                  Finalizar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
