import { useState } from "react";

import {
  ChevronLeft,
  Clock,
  BadgeDollarSign,
  LogOut,
  User,
} from "lucide-react";

import "./styles.scss";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth.js";

export function Sidebar() {
  const [sidebarAberto, setSidebarAberto] = useState(false);

  const { sair } = useAuth();

  const navigate = useNavigate();

  function deslogarAutonomo() {
    sair();

    navigate("/painel");
  }

  function abrirSidebar() {
    setSidebarAberto(!sidebarAberto);
  }

  const location = useLocation();

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
        <Link to="/">
          <li
            className={`item-lista ${
              location.pathname.replace("/", "") == "" && "selecionado"
            }`}
          >
            <Clock size={18} color="white" />
            {sidebarAberto && (
              <a href="" className="label-lista">
                Visitas
              </a>
            )}
          </li>
        </Link>

        <Link to="/orcamentos">
          <li
            className={`item-lista ${
              location.pathname.replace("/", "") == "orcamentos" &&
              "selecionado"
            }`}
          >
            <BadgeDollarSign size={18} color="white" />
            {sidebarAberto && (
              <a href="" className="label-lista">
                Orçamentos
              </a>
            )}
          </li>
        </Link>
      </ul>

      <div className="logout-container">
        <button className="btn-sair" onClick={deslogarAutonomo}>
          <LogOut size={20} color="white" />
          {sidebarAberto && <span>Sair</span>}
        </button>
      </div>
    </nav>
  );
}
