import { BiUser } from "react-icons/bi";
import "./styles.scss";

export function CardVisita({ cliente, descricao, status, abrirDetalhes }) {
  return (
    <div
      className="card"
      style={{
        borderLeft: `5px solid ${
          status === "confirmado" ? "#80ed99" : "#585858"
        }`,
        cursor: `${status === "finalizado" && "not-allowed"}`,
      }}
      onClick={abrirDetalhes}
    >
      <div className="info-cliente">
        <BiUser className="icon-cliente" />

        <span className="nome-cliente">{cliente}</span>
      </div>

      <div className="info-card">
        <p className="desc-card">{descricao}</p>
      </div>
    </div>
  );
}
