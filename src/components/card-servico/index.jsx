import { Briefcase } from "lucide-react";

export function CardServico({ servico }) {
  return (
    <div className="card-servico">
      <Briefcase className="icon-servico" size={18} />
      <p className="nome-servico">{servico}</p>
    </div>
  );
}
