import { useState } from "react";

export default function CreateAnuncioPage() {
  const [anuncio, setAnuncio] = useState({
    titulo: "",
    preco: 0,
    descricaoCurta: "",
    descricaoCompleta: "",
    imagem: "",
  });

  function handleChange(event) {
    const { value, name } = event.target;

    setAnuncio({
      ...anuncio,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const token = JSON.parse(localStorage.getItem("token"));
    const userId = JSON.parse(localStorage.getItem("userId"));

    const res = await fetch(
      `https://dc-classificados.up.railway.app/api/anuncios/addnewanuncio?userId=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...anuncio,
          preco: Number(anuncio.preco),
        }),
      },
    );

    const data = await res.json();

    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Criar anuncio</h1>

      <label htmlFor="titulo">Titulo:</label>
      <input type="text" name="titulo" id="titulo" onChange={handleChange} />
      <label htmlFor="preco">preço:</label>
      <input type="text" name="preco" id="preco" onChange={handleChange} />
      <label htmlFor="descricaoCurta">descricaoCurta:</label>
      <input
        type="text"
        name="descricaoCurta"
        id="descricaoCurta"
        onChange={handleChange}
      />
      <label htmlFor="descricaoCompleta">descricaoCompleta:</label>
      <input
        type="text"
        name="descricaoCompleta"
        id="descricaoCompleta"
        onChange={handleChange}
      />
      <label htmlFor="imagem">imagem:</label>
      <input type="text" name="imagem" id="imagem" onChange={handleChange} />
      <button type="submit">Criar anuncio</button>
    </form>
  );
}
