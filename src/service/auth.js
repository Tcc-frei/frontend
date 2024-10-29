import { api } from "../service/axios.js";

export async function entrar(email, senha) {
  try {
    const response = await api.post("/elethronos/entrar", {
      email,
      senha,
    });

    const { token } = response.data;

    localStorage.setItem("TOKEN", token);
  } catch (error) {
    console.log(error);
  }
}
