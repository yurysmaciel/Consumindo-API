import { useState } from "react";

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
    <div>
      <h1>Pagina login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Fazer login</button>
      </form>
    </div>
  );
}
