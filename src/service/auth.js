export function entrar(email, senha) {
  try {
    if (email === "rodrigo@gmail.com" && senha === "123") {
      localStorage.setItem("token", "token_aleatorio");
    } else {
      throw new Error("Credenciais invalidas !")
    }

  } catch (error) {
    console.error(error)
  }
}

export function usuarioEstaLogado() {
  const token = localStorage.getItem("token");

  return token != null && token != "";
}