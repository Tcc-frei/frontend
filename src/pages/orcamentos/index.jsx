import { useEffect, useState } from "react";
import { CardVisita } from "../../components/card-visita";
import { Sidebar } from "../../components/sidebar";

import "./styles.scss";
import { api } from "../../service/axios";

export function OrcamentoPage() {
  const [orcamentos, setOrcamentos] = useState([]);

  useEffect(() => {
    async function pegarOrcamentos() {
      try {
        const resposta = await api.get("/orcamentos");

        // console.log(resposta.data);

        setOrcamentos(resposta.data);
      } catch (error) {
        console.log(error);
      }
    }

    pegarOrcamentos();
  }, []);

  return (
    <div className="pagina">
      <Sidebar />

      <div className="main-content">
        <div className="cabecalho">
          <h2 className="titulo-cabecalho">Orçamentos</h2>
        </div>

        <section className="container-visitas">
          <div className="visitas">
            <h3 className="txt-confirmada">Aprovados</h3>

            <div className="container-cards">
              {orcamentos
                .filter((o) => o.status === "aprovado")
                .map((o) => {
                  return (
                    <CardVisita
                      key={o.id}
                      cliente={o.cliente}
                      descricao={o.descricao}
                      status={o.status}
                    />
                  );
                })}
            </div>
          </div>

          <div className="visitas">
            <h3 className="txt-pendente">Pendentes</h3>

            <div className="container-cards">
              {orcamentos
                .filter((o) => o.status === "pendente")
                .map((o) => {
                  return (
                    <CardVisita
                      key={o.id}
                      cliente={o.cliente}
                      descricao={o.descricao}
                      status={o.status}
                    />
                  );
                })}
            </div>
          </div>

          <div className="visitas">
            <h3 className="txt-finalizado">Finalizados</h3>

            <div className="container-cards">
              {orcamentos
                .filter((o) => o.status === "finalizado")
                .map((o) => {
                  return (
                    <CardVisita
                      key={o.id}
                      cliente={o.cliente}
                      descricao={o.descricao}
                      status={o.status}
                    />
                  );
                })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
