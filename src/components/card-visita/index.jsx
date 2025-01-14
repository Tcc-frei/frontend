import { BiUser } from "react-icons/bi";
import "./styles.scss";

export function CardVisita({
  cliente,
  descricao,
  logradouro,
  telefone,
  status,
  abrirDetalhes,
}) {

  return (
    <div
      className="card"
      style={{
        borderLeft: `5px solid ${
          status === "confirmado"
            ? "#80ed99"
            : status === "aprovado" 
            ? "#80ed99"
            : status === "pendente"
            ? "#ff9d00"
            : "#585858"
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
        {descricao ? (
          <p className="desc-card">{descricao}</p>
        ) : (
          <>
            <p className="desc-card">Logradouro: {logradouro}</p>
            <p className="desc-card">Telefone: {telefone}</p>
          </>
        )}
      </div>
    </div>
  );
}
