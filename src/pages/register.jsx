import { useState } from "react";

export default function Register() {
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    cidade: "",
    estado: "",
  });

  function handleChange(event) {
    const { value, name } = event.target;

    setNovoUsuario({
      ...novoUsuario,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const res = await fetch(
      "https://dc-classificados.up.railway.app/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...novoUsuario,
          telefone: Number(novoUsuario.telefone),
        }),
      },
    );

    const user = await res.json();

    if (!res.ok) {
      throw new Error(user.message);
    }

    localStorage.setItem("id", JSON.stringify(user.id));

    console.log(user);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Crie sua conta</h1>
      <label htmlFor="nome">Digite seu nome:</label>
      <input
        type="text"
        name="nome"
        id="nome"
        value={novoUsuario.nome}
        onChange={handleChange}
      />

      <label htmlFor="email">Digite seu melhor email:</label>
      <input
        type="email"
        name="email"
        id="email"
        value={novoUsuario.email}
        onChange={handleChange}
      />

      <label htmlFor="senha">Crie sua senha:</label>
      <input
        type="password"
        name="senha"
        id="senha"
        value={novoUsuario.senha}
        onChange={handleChange}
      />

      <label htmlFor="telefone">Digite seu telefone</label>
      <input
        type="text"
        name="telefone"
        id="telefone"
        value={novoUsuario.telefone}
        onChange={handleChange}
      />

      <label htmlFor="cidade">Em que cidade mora?</label>
      <input
        type="text"
        name="cidade"
        id="cidade"
        value={novoUsuario.cidade}
        onChange={handleChange}
      />

      <label htmlFor="estado">Estado:</label>
      <input
        type="text"
        name="estado"
        id="estado"
        value={novoUsuario.estado}
        onChange={handleChange}
      />
      <button type="submit">Criar conta</button>
    </form>
  );
}
