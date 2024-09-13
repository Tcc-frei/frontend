import "./app.scss";

import imgCadeado from "./assets/logo-key.svg";
import logoRaio from "./assets/logo-thunder.svg";

import { LuKeyRound } from "react-icons/lu";

export function App() {
  return (
    <main className="conteudo-principal">
      <div className="conteudo-esquerdo">
        <div className="cabecalho-esquerdo">
          <img src={logoRaio} alt="Logo de um raio" width={60} />
        </div>

        <img src={imgCadeado} alt="Logo de um cadeado" width={200} />

        <span className="mensagem">
          Bem-vindo ao portal administrativo da Elethronos.
        </span>
      </div>
      <div className="conteudo-direito">
        <div className="titulo">
          <LuKeyRound />
          <h3>Painel de administrador</h3>
        </div>

        <form className="formulario">
          <input type="text" placeholder="E-mail" />

          <input type="password" placeholder="Senha" />

          <button type="submit">Entrar</button>
        </form>

        <p className="direitos">
          Todos os direitos são reservados para Info Solutions.
        </p>
      </div>
    </main>
  );
}
