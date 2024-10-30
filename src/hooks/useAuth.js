import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Contexto não existe !");

  return context;
}
