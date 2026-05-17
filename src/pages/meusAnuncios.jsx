import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./meusAnuncios.css";

export default function MeusAnuncios() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function carregarMeusAnuncios() {
      try {
        setLoading(true);

        const token = JSON.parse(localStorage.getItem("token"));

        const userId = JSON.parse(localStorage.getItem("userId"));

        const res = await fetch(
          `https://dc-classificados.up.railway.app/api/anuncios/getallmyanuncios?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const meusAnuncios = await res.json();

        setData(meusAnuncios);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    carregarMeusAnuncios();
  }, []);

  function acessarAnuncio(anuncio) {
    navigate("/meusAnunciosEsp", {
      state: anuncio,
    });
  }

  return (
    <div className="meus-container">
      <h1 className="titulo">Meus anúncios</h1>

      <p className="subtitulo">Visualize e gerencie seus anúncios</p>

      {loading ? (
        <p className="loading">Carregando...</p>
      ) : (
        <div className="lista-anuncios">
          {data.map((item, idx) => {
            return (
              <div
                className="card-anuncio"
                key={idx}
                onClick={() => acessarAnuncio(item)}
              >
                <div className="imagem-container">
                  <img src={item.imagem} alt={item.titulo} />
                </div>

                <div className="info-anuncio">
                  <h2>{item.titulo}</h2>

                  <p className="preco">R$ {item.preco}</p>

                  <button>Ver anúncio</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
