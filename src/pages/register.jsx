import { useState } from "react";
import "./register.css";

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
    <div className="register-container">
      <div className="register-card">
        <h1>Crie sua conta</h1>

        <p>Preencha os dados abaixo para criar seu cadastro</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nome">Nome</label>

            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite seu nome"
              value={novoUsuario.nome}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu email"
              value={novoUsuario.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>

            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Crie sua senha"
              value={novoUsuario.senha}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="telefone">Telefone</label>

            <input
              type="text"
              id="telefone"
              name="telefone"
              placeholder="(00) 00000-0000"
              value={novoUsuario.telefone}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="cidade">Cidade</label>

            <input
              type="text"
              id="cidade"
              name="cidade"
              placeholder="Sua cidade"
              value={novoUsuario.cidade}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="estado">Estado</label>

            <input
              type="text"
              id="estado"
              name="estado"
              placeholder="Seu estado"
              value={novoUsuario.estado}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Criar conta</button>
        </form>
      </div>
    </div>
  );
}
