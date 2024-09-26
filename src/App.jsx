import { useEffect, useState } from "react";
import "./app.scss";

import { useNavigate } from "react-router-dom";

import { usuarioEstaLogado } from "./service/auth.js";
import { BiX } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { CardVisita } from "./components/card-visita/index.jsx";
import { visitas } from "./mocks/visitas-mocks.jsx";

import { withMask } from "use-mask-input";

import axios from "axios";

export function App() {
  const [modalClienteAberto, setModalClienteAberto] = useState(false);
  const [cep, setCep] = useState("");

  const [loadingCEP, setLoadingCEP] = useState(false);

  const [endereco, setEndereco] = useState({
    bairro: "",
    logradouro: "",
  });

  const navigate = useNavigate();

  const abrirModal = () => setModalClienteAberto(true);

  const fecharModal = () => setModalClienteAberto(false);

  async function pegarCEP() {
    setLoadingCEP(true)
    
    try {
      const resposta = await axios.get(
        `https://brasilapi.com.br/api/cep/v2/${cep}`
      );

      setEndereco({
        bairro: resposta.data.neighborhood,
        logradouro: resposta.data.street,
      });
    } catch (error) {
      const { errors } = error.response.data;

      console.log(errors);

      console.log(error.response.data);
    } finally {
      setLoadingCEP(false);
    }
  }

  useEffect(() => {
    if (!usuarioEstaLogado()) navigate("/painel");
  }, []);

  return (
    <main className="pagina-visita">
      <div className="cabecalho-visita">
        <h2 className="titulo-visita">Visitas</h2>

        <button className="btn-visita" onClick={abrirModal}>
          <BsPlus /> criar nova visita
        </button>
      </div>

      {modalClienteAberto && (
        <div className="container-modal">
          <div className="modal">
            <h2 className="titulo-modal">Cadastro visita</h2>

            <BiX className="close-icon" onClick={fecharModal} />

            <div className="content-modal">
              <form className="formulario">
                <div className="grupo-input">
                  <label htmlFor="nome">NOME CLIENTE</label>
                  <input type="text" id="nome" />
                </div>
                <div className="grupo-input">
                  <label htmlFor="bairro">BAIRRO</label>
                  <input
                    type="text"
                    id="bairro"
                    disabled
                    value={endereco.bairro}
                  />
                </div>
                <div className="grupo-input">
                  <label htmlFor="telefone">TELEFONE CLIENTE</label>
                  <input
                    type="text"
                    id="telefone"
                    ref={withMask("(99) 99999-9999")}
                  />
                </div>
                <div className="grupo-input">
                  <label htmlFor="log">LOGRADOURO</label>
                  <input
                    className="animate"
                    type="text"
                    id="log"
                    disabled
                    value={endereco.logradouro}
                  />
                </div>
                <div className="grupo-input">
                  <label htmlFor="cep">CEP CLIENTE</label>
                  <input
                    type="text"
                    onBlur={pegarCEP}
                    id="cep"
                    ref={withMask("99999-999")}
                    onChange={(e) => setCep(e.target.value)}
                    value={cep}
                  />
                </div>
                <div className="grupo-input">
                  <label htmlFor="numero">N° CASA</label>
                  <input type="number" id="numero" />
                </div>

                <button type="button" className="btn-proximo">
                  Próximo
                </button>
              </form>
            </div>
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
                    key={v.id}
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
