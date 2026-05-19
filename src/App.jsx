import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function carregarAnuncios() {
      setLoading(true);

      const res = await fetch(
        "https://dc-classificados.up.railway.app/api/anuncios/getallanuncios",
        {
          method: "GET",
        },
      );
      const anuncios = await res.json();
      setData(anuncios);

      setLoading(false);
    }

    carregarAnuncios();
  }, []);

  console.log(data);

  return (
    <div className="container">
      <nav className="container-nav">
        <a href="/login">login</a>
        <a href="/criar">Cadastrar-se</a>
      </nav>
      <h1 className="titulo">Todos os anúncios</h1>

      {loading ? (
        <p className="loading">Carregando...</p>
      ) : (
        <div className="lista-produtos">
          {data.map((item, idx) => {
            return (
              <div className="card-produto" key={idx}>
                <img src={item.imagem} alt={item.titulo} />

                <div className="info-produto">
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

export default App;
