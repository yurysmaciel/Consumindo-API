import { useState } from "react";
import "./createAnuncio.css";

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
    <div className="anuncio-container">
      <div className="anuncio-card">
        <h1>Criar anúncio</h1>

        <p>Preencha as informações abaixo para publicar seu produto</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="titulo">Título</label>

            <input
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Digite o título"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="preco">Preço</label>

            <input
              type="number"
              id="preco"
              name="preco"
              placeholder="R$ 0,00"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="descricaoCurta">Descrição curta</label>

            <input
              type="text"
              id="descricaoCurta"
              name="descricaoCurta"
              placeholder="Resumo rápido"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="descricaoCompleta">Descrição completa</label>

            <textarea
              id="descricaoCompleta"
              name="descricaoCompleta"
              placeholder="Detalhes completos do produto"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="imagem">URL da imagem</label>

            <input
              type="text"
              id="imagem"
              name="imagem"
              placeholder="Cole a URL da imagem"
              onChange={handleChange}
            />
          </div>

          <button type="submit">Criar anúncio</button>
        </form>
      </div>
    </div>
  );
}
