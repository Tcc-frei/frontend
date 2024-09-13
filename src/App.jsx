import "./app.scss";

import imgCadeado from "./assets/logo-key.svg";

import logoRaio from "./assets/logo-thunder.svg";

export function App() {
  return (
    <main className="conteudo-principal">
      <div className="conteudo-esquerdo">
        <div className="cabecalho-esquerdo">
          <img src={logoRaio} alt="Logo de um raio" width={60} />
        </div>

        <img src={imgCadeado} alt="Logo de um cadeado" width={200} />

        <span className="mensagem">
          Bem-vindo ao portal administrativo da Elethronos. Seu papel é
          fundamental para a gestão eficiente.
        </span>
      </div>
      <div className="conteudo-direito">
        <h3>PAINEL DE ADMINISTRADOR</h3>
      </div>
    </main>
  );
}
