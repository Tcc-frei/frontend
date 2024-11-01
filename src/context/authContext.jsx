import { createContext, useEffect, useState } from "react";

import { api } from "../service/axios";

export const AuthContext = createContext({
  erro: null,
  usuarioLogado: false,
  entrar: () => {},
  sair: () => {},
});

export function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [erro, setErro] = useState(null);

  const entrar = async (email, senha) => {
    try {
      const response = await api.post("/elethronos/entrar", {
        email,
        senha,
      });

      const { token } = response.data;
      localStorage.setItem("usuario", token);

      setUsuarioLogado(!!token);
    } catch (e) {
      setErro(e.response.data.erro);
    }
  };

  const sair = () => {
    localStorage.removeItem("usuario");
    setUsuarioLogado(false);
  };

  const verificarUsuarioLogado = async () => {
    try {
      const token = localStorage.getItem("usuario");

      await api.get("/elethronos/validar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsuarioLogado(true);
    } catch (e) {}
  };

  useEffect(() => {
    verificarUsuarioLogado();
  }, []);

  return (
    <AuthContext.Provider value={{ usuarioLogado, entrar, sair, erro }}>
      {children}
    </AuthContext.Provider>
  );
}
