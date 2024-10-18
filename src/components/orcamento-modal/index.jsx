import { BiX } from "react-icons/bi";
import "./styles.scss";
import { useEffect, useState } from "react";

export function OrcamentoModal({ fecharModal }) {
  const [descricao, setDescricao] = useState("");

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
              <input placeholder="Serviço" type="text" />
              <input placeholder="Preço" type="number" />

              <button className="btn-adicionar">Adicionar serviço</button>
            </div>
          </form>
        </div>
      </div>

      <div className="modal servicos">
        <h2 className="titulo-modal">Serviços registrados</h2>

        <div className="content-modal"></div>
      </div>
    </div>
  );
}
