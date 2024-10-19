import { BiX } from "react-icons/bi";
import "./styles.scss";
import { useEffect, useState } from "react";

export function OrcamentoModal({ fecharModal }) {
  const [descricao, setDescricao] = useState("");
  const [servico, setServico] = useState("");
  const [precoServico, setPrecoServico] = useState("");

  const [servicosAdicionados, setServicosAdicionados] = useState([
    {
      nome: "Troca de lampada",
      preco: 500,
    },
  ]);

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

  function adicionarServico() {
    setServicosAdicionados((prevState) => [
      ...prevState,
      {
        nome: servico,
        preco: Number(precoServico),
      },
    ]);

    setServico("");
    setPrecoServico("");
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
                placeholder="Descreva aqui quaisquer problemas ou necessidades específicas que o cliente tenha mencionado durante a visita."
              ></textarea>

              <span style={{ color: corSpan }}>{descricao.length}/250</span>

              <button className="btn">cadastrar orçamento</button>
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
            {servicosAdicionados.map((servico) => {
              return (
                <div className="servico-item">
                  <span>{servico.nome}</span>
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
