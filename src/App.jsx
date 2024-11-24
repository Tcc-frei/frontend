import { useEffect, useState } from "react";
import "./app.scss";

import { useNavigate } from "react-router-dom";

import { BiX } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { CardVisita } from "./components/card-visita/index.jsx";

import { withMask } from "use-mask-input";

import axios from "axios";
import { horarios } from "./mocks/horarios-mocks.js";
import { ModalVisita } from "./components/visita-modal/index.jsx";
import { Sidebar } from "./components/sidebar/index.jsx";
import { OrcamentoModal } from "./components/orcamento-modal/index.jsx";
import { api } from "./service/axios.js";
import toast from "react-hot-toast";
import { Settings } from "lucide-react";

export function App() {
  const [visitas, setVisitas] = useState([]);

  const [showClienteModal, setShowClienteModal] = useState(false);
  const [showHorarioModal, setShowHorarioModal] = useState(false);
  const [showVisitaModal, setShowVisitaModal] = useState(false);
  const [showOrcamentoModal, setShowOrcamentoModal] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const [idVisitaSelecionada, setIdVisitaSelecionada] = useState(0);

  const [horaSelecionada, setHoraSelecionada] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState("");

  const [cep, setCep] = useState("");

  // dados do usuario / visita para salvar no banco
  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [numeroCasa, setNumeroCasa] = useState("");

  const [loadingCEP, setLoadingCEP] = useState(false);

  const [endereco, setEndereco] = useState({
    bairro: "",
    logradouro: "",
  });

  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();

  const abrirModalCliente = () => setShowClienteModal(true);

  const fecharModalCliente = () => setShowClienteModal(false);

  const abrirModalHorario = () => {
    if (!cliente.trim() || !telefone) {
      return toast.error("Preencha os campos para continuar.", {
        position: "top-center",
      });
    }

    setShowClienteModal(false);

    setShowHorarioModal(true);
  };

  const fecharModalHorario = () => setShowHorarioModal(false);

  const voltarModalHorario = () => {
    setShowHorarioModal(false);

    setShowClienteModal(true);
  };

  const abrirDetalhesVisita = (id) => {
    setIdVisitaSelecionada(id);

    setShowVisitaModal(true);
  };

  const fecharDetalhesVisita = () => setShowVisitaModal(false);

  const abrirOrcamentoModal = () => {
    setShowVisitaModal(false);

    setShowOrcamentoModal(true);
  };

  const fecharModalOrcamento = () => setShowOrcamentoModal(false);

  const togglePopup = () => setShowPopup(!showPopup);

  async function pegarCEP() {
    setLoadingCEP(true);

    try {
      const resposta = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);

      setEndereco({
        bairro: resposta.data.bairro,
        logradouro: resposta.data.logradouro,
      });
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar o CEP inserido.", {
        position: "top-right",
      });
    } finally {
      setLoadingCEP(false);
    }
  }

  // Função para salvar o agendamento no banco de dados
  async function criarAgendamento() {
    try {
      const dataFormatada = `${dataSelecionada}:${horaSelecionada}`;

      const objeto = {
        cliente: {
          nome: cliente,
          telefone: telefone,
          cep: cep,
          numeroCasa: numeroCasa,
          bairro: endereco.bairro,
          logradouro: endereco.logradouro,
        },
        visita: {
          data: dataFormatada,
        },
      };

      await api.post("/cadastrar/visita", objeto);

      toast.success("Visita agendada com sucesso !", {
        position: "top-right",
      });
    } catch (e) {
      toast.error("Ocorreu um erro ao criar o agendamento.", {
        position: "top-right",
      });
    } finally {
      setShowHorarioModal(false);
      pegarVisitas();

      setCliente("");
      setTelefone("");
      setCep("");
      setEndereco({});
      setNumeroCasa("");
    }
  }

  function selecionarHorario(hora) {
    setHoraSelecionada(hora);
  }

  async function pegarVisitas() {
    try {
      const resposta = await api.get("/visitas");

      setVisitas(resposta.data);
    } catch (e) {
      toast.error("Ocorreu um ao buscar os agendamentos.", {
        position: "top-right",
      });
    }
  }

  async function enviarFeedback(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("usuario");

      await api.post(
        "/feedback",
        {
          conteudo: feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Agradecemos ao seu feedback, retornaremos em breve !", {
        position: "top-right",
      });
    } catch (e) {
      toast.error("Ocorreu um erro ao enviar seu feedback.", {
        position: "top-right",
      });
    } finally {
      setFeedback("");
    }
  }

  useEffect(() => {
    pegarVisitas();
  }, []);

  return (
    <main className="pagina">
      <Sidebar />

      <div className="main-content">
        <div className="cabecalho">
          <h2 className="titulo-cabecalho">Visitas</h2>

          <button className="btn-visita" onClick={abrirModalCliente}>
            <BsPlus /> criar nova visita
          </button>
        </div>

        {showClienteModal && (
          <div className="container-modal">
            <div className="modal">
              <h2 className="titulo-modal">Cadastro visita</h2>

              <BiX className="close-icon" onClick={fecharModalCliente} />

              <div className="content-modal">
                <form className="formulario">
                  <div className="grupo-input">
                    <label htmlFor="nome">NOME CLIENTE</label>
                    <input
                      type="text"
                      id="nome"
                      onChange={(e) => setCliente(e.target.value)}
                      value={cliente}
                    />
                  </div>
                  <div className="grupo-input">
                    <label htmlFor="bairro">BAIRRO</label>
                    <input
                      className={`${loadingCEP && "animate"}`}
                      placeholder={`${loadingCEP ? "Buscando..." : ""}`}
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
                      onChange={(e) => setTelefone(e.target.value)}
                      value={telefone}
                    />
                  </div>
                  <div className="grupo-input">
                    <label htmlFor="log">LOGRADOURO</label>
                    <input
                      className={`${loadingCEP && "animate"}`}
                      placeholder={`${loadingCEP ? "Buscando..." : ""}`}
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
                    <input
                      type="number"
                      id="numero"
                      onChange={(e) => setNumeroCasa(e.target.value)}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn-proximo"
                    onClick={abrirModalHorario}
                  >
                    Próximo
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {showHorarioModal && (
          <div className="container-modal horario">
            <div className="modal">
              <h2 className="titulo-modal">Horários Disponíveis</h2>
              <p className="subtitulo-modal">
                Agora selecione a data e hora que mais se encaixa na sua agenda
                !
              </p>

              <BiX className="close-icon" onClick={fecharModalHorario} />

              <div className="content-modal">
                <div className="grupo-input">
                  <label htmlFor="date">Data agendamento</label>
                  <input
                    type="date"
                    id="date"
                    onChange={(e) => setDataSelecionada(e.target.value)}
                    value={dataSelecionada}
                    className="input-calendario"
                    ref={withMask("99/99/9999")}
                  />
                </div>

                <div className="container-horarios">
                  {horarios.map((hora, idx) => {
                    return (
                      <div
                        className={`card-hora ${
                          hora == horaSelecionada && "hora-selecionada"
                        }`}
                        onClick={() => selecionarHorario(hora)}
                        key={idx}
                      >
                        <span>{hora}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="container-buttons">
                  <button className="btn" onClick={voltarModalHorario}>
                    Voltar
                  </button>
                  <button className="btn salvar" onClick={criarAgendamento}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showVisitaModal && (
          <div className="container-modal">
            <ModalVisita
              id={idVisitaSelecionada}
              fecharModal={fecharDetalhesVisita}
              onClick={abrirOrcamentoModal}
            />
          </div>
        )}

        {showOrcamentoModal && (
          <div className="container-modal">
            <OrcamentoModal
              fecharModal={fecharModalOrcamento}
              idVisita={idVisitaSelecionada}
            />
          </div>
        )}

        <section className="container-visitas">
          <div className="visitas">
            <h3 className="txt-confirmada">Confirmados</h3>

            <div className="container-cards">
              {visitas.length > 0 &&
                visitas
                  .filter((v) => v.status === "confirmado")
                  .map((v) => {
                    return (
                      <CardVisita
                        key={v.id}
                        cliente={v.cliente}
                        logradouro={v.logradouro}
                        telefone={v.telefone}
                        status={v.status}
                        abrirDetalhes={() => abrirDetalhesVisita(v.id)}
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
                      key={v.id}
                      cliente={v.cliente}
                      logradouro={v.logradouro}
                      status={v.status}
                    />
                  );
                })}
            </div>
          </div>
        </section>

        <div className="feedback-container">
          {showPopup && (
            <div className="feedback-input">
              <form>
                <textarea
                  rows={4}
                  placeholder="Fique a vontade para descrever qualquer sugestão de melhorias ou reportar algum erro encontrado..."
                  onChange={(e) => setFeedback(e.target.value)}
                  value={feedback}
                ></textarea>

                <button
                  disabled={feedback.length <= 10}
                  className="btn enviar"
                  onClick={enviarFeedback}
                >
                  Enviar
                </button>
              </form>
            </div>
          )}

          <button className="feedback" onClick={togglePopup}>
            <Settings className="icon-feedback" />
          </button>
        </div>
      </div>
    </main>
  );
}
