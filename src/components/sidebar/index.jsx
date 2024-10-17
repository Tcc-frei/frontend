import { useState } from "react";
import {
  ChevronLeft,
  Clock,
  BadgeDollarSign,
  LogOut,
  User,
} from "lucide-react";

import "./styles.scss";

export function Sidebar() {
  const [sidebarAberto, setSidebarAberto] = useState(false);

  function abrirSidebar() {
    setSidebarAberto(!sidebarAberto);
  }

  return (
    <nav className={`barra-lateral ${sidebarAberto && "aberto"}`}>
      <div className="btn-barra" onClick={abrirSidebar}>
        <ChevronLeft size={20} />
      </div>

      <div className="header-sidebar">
        <User />

        {sidebarAberto && (
          <div className="user-info">
            <p>Rodrygo</p>
            <span>Administrador</span>
          </div>
        )}
      </div>

      <ul className="lista" style={{ flex: 1 }}>
        <li className="item-lista selecionado">
          <Clock size={18} />
          {sidebarAberto && <a href="">Visitas</a>}
        </li>

        <li className="item-lista">
          <BadgeDollarSign size={18} />
          {sidebarAberto && <a href="">Orçamentos</a>}
        </li>
      </ul>

      <div className="logout-container">
        <button className="btn-sair">
          <LogOut size={20} />
          {sidebarAberto && <span>Sair</span>}
        </button>
      </div>
    </nav>
  );
}
