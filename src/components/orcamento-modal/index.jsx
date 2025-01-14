import { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";

import { api } from "../../service/axios";

import "./styles.scss";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function OrcamentoModal({ fecharModal, idVisita }) {
  const [descricao, setDescricao] = useState("");
  const [servico, setServico] = useState("");
  const [precoServico, setPrecoServico] = useState("");

  const navigate = useNavigate();

  const [servicosAdicionados, setServicosAdicionados] = useState([]);

  const [corSpan, setCorSpan] = useState("");

  function definirCorSpan(tamanhoTexto) {
    if (tamanhoTexto === 250) {
      setCorSpan("red");
    } else if (tamanhoTexto >= 200) {
      setCorSpan("yellow");
    } else {
      setCorSpan("white");
    }
  }

  async function adicionarServico() {
    try {
      const resposta = await api.post("/servico", {
        nome: servico,
        preco: precoServico,
      });

      const { id } = resposta.data;

      setServicosAdicionados((prevState) => [
        ...prevState,
        {
          id: id,
          nome: servico,
          preco: Number(precoServico),
        },
      ]);

      setServico("");
      setPrecoServico("");
    } catch (error) {
      const { erro } = error.response.data;

      toast.error(erro);
    }
  }

  async function criarOrcamento() {
    try {
      if (servicosAdicionados.length <= 0) {
        return toast.error("Não é possivel criar um orçamento sem serviço", {
          position: "top-right",
        });
      }

      if (!descricao.trim())
        return toast.error("Faça uma breve descrição do orçamento.");

      const arrayIdServicos = servicosAdicionados.map((m) => m.id);

      await api.post(`/orcamento/${idVisita}`, {
        descricao: descricao,
        arrayServicos: arrayIdServicos,
      });

      navigate("/orcamentos");
    } catch (error) {
      toast.error("Ocorreu um erro ao criar o orçamento.", {
        position: "top-right",
      });
    }
  }

  function removerServico(id) {
    const novoArray = servicosAdicionados.filter((s) => s.id != id);

    setServicosAdicionados(novoArray);
  }

  function formatarServico(servico) {
    return servico.length >= 20 ? servico.slice(0, 20).concat("...") : servico;
  }

  useEffect(() => {
    definirCorSpan(descricao.length);
  }, [descricao]);

  return (
    <div className="container-modais">
      <div className="modal orcamento">
        <h2 className="titulo-modal">Cadastro Orçamento</h2>

        <BiX className="close-icon" onClick={fecharModal} />

        <div className="content-modal">
          <form>
            <div className="container-esquerdo">
              <textarea
                maxLength={250}
                onChange={(e) => setDescricao(e.target.value)}
                value={descricao}
                className="input-descricao"
                placeholder="Descreva aqui quaisquer problemas ou necessidades específicas que o cliente tenha mencionado durante a visita."
              ></textarea>

              <span style={{ color: corSpan }} className="tamanho-desc">
                {descricao.length}/250
              </span>

              <button type="button" className="btn" onClick={criarOrcamento}>
                cadastrar orçamento
              </button>
            </div>

            <div className="container-inputs">
              <input
                placeholder="Serviço"
                type="text"
                onChange={(e) => setServico(e.target.value)}
                value={servico}
              />
              <input
                placeholder="Preço"
                type="number"
                onChange={(e) => setPrecoServico(e.target.value)}
                value={precoServico}
              />

              <button
                type="button"
                className="btn-adicionar"
                onClick={adicionarServico}
              >
                Adicionar serviço
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="modal servicos">
        <h2 className="titulo-modal">Serviços registrados</h2>

        <div className="content-modal">
          <div className="content-servicos">
            {servicosAdicionados.map((servico, idx) => {
              return (
                <div key={idx} className="servico-item">
                  <div className="nome-servico">
                    <span>{formatarServico(servico.nome)}</span>

                    <Trash
                      onClick={() => removerServico(servico.id)}
                      size={18}
                      color="#e9ecef"
                      className="icon-servico"
                    />
                  </div>
                  <span className="servico-preco">
                    R$ {servico.preco.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
