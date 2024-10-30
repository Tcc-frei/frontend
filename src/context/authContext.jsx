import { createContext, useEffect, useState } from "react";

import { api } from "../service/axios";

export const AuthContext = createContext({
  usuarioLogado: false,
  entrar: (email, senha) => {},
  sair: () => {},
});

export function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(false);

  const entrar = async (email, senha) => {
    try {
      const response = await api.post("/elethronos/entrar", {
        email,
        senha,
      });

      const { token } = response.data;

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      localStorage.setItem("usuario", token);

      setUsuarioLogado(!!token);
    } catch (e) {
      console.log(e);
    }
  };

  const sair = () => {
    localStorage.removeItem("usuario");
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
    <AuthContext.Provider value={{ usuarioLogado, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}
