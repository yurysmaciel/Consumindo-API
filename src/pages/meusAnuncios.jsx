import { useEffect, useState } from "react";

export default function MeusAnuncios() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <h1>Meus anuncios</h1>
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
