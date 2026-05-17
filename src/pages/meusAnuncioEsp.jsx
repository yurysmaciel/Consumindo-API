import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./meusAnunciosEsp.css";

export default function MeusAnunciosEsp() {
  const { state } = useLocation();

  const [loading] = useState(false);

  if (!state) {
    return (
      <div className="anuncio-detalhe-container">
        <div className="anuncio-detalhe-card">
          <h1>Nenhum anúncio encontrado</h1>

          <p>Não foi possível carregar este anúncio.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="anuncio-detalhe-container">
      <h1 className="titulo">Meu anúncio</h1>

      <p className="subtitulo">Informações completas do anúncio</p>

      {loading ? (
        <p className="loading">Carregando...</p>
      ) : (
        <div className="anuncio-detalhe-card">
          <div className="imagem-container">
            <img src={state.imagem} alt={state.titulo} />
          </div>

          <div className="info-detalhes">
            <h2>{state.titulo}</h2>

            <p className="preco">R$ {state.preco}</p>

            <div className="descricao-box">
              <h3>Descrição curta</h3>

              <p>{state.descricaoCurta}</p>
            </div>

            <div className="descricao-box">
              <h3>Descrição completa</h3>

              <p>{state.descricaoCompleta}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
