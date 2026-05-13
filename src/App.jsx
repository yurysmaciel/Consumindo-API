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
    <>
      <h1>Todos os anúncios</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((item, idx) => {
          return (
            <div key={idx}>
              <h2>{item.titulo}</h2>
              <img src={item.imagem} alt={item.titulo} />
              <p>{item.preco}</p>
            </div>
          );
        })
      )}
    </>
  );
}

export default App;
