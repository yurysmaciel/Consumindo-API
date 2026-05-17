import { useState } from "react";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const obj = {
      email,
      senha: password,
    };

    const res = await fetch(
      "https://dc-classificados.up.railway.app/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      },
    );

    const response = await res.json();

    localStorage.setItem("userId", JSON.stringify(response.userId));

    localStorage.setItem("token", JSON.stringify(response.token));

    console.log(response);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Entrar</h1>

        <p>Faça login para acessar sua conta</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Senha</label>

            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit">Fazer login</button>
        </form>
      </div>
    </div>
  );
}
