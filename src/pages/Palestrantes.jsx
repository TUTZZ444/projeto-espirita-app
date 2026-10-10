import "../Palestrantes.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import palestrantes from "../palestrantes.json";

function criarSlug(nome) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
}

function Palestrantes() {
    const [pesquisa, setPesquisa] = useState("");

    const palestrantesFiltrados = palestrantes.filter(
      palestrante => {

      const termo = pesquisa
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      if (!termo) {
        return true;
      }

      return Object.values(palestrante).some(valor => {

        if (
          valor === null ||
          valor === undefined
        ) {
          return false;
        }

        const texto = String(valor)
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        return texto.includes(termo);

        });

      }
    );

  return (
    <div className="pagina-palestrantes">
      
      <Link
        to="/"
        className="voltar-inicio"
      >
        ← Página inicial
      </Link>

      <h1>Palestrantes</h1>

      {/* PESQUISA */}

    <div className="pesquisa-container">
        <input
            type="text"
            placeholder="Pesquisar palestrante..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="pesquisa"
        />

        <span className="icone-pesquisa">🔎</span>
    </div>


      {/* RESULTADOS */}

      <div className="grid-palestrantes">

        {palestrantesFiltrados.map((palestrante, index) => (

          <Link
            key={index}
            to={`/palestrantes/${criarSlug(palestrante.Nome)}`}
            className="card-palestrante"
          >

            <h2>{palestrante.Nome}</h2>

            <p>
              <strong>IE:</strong>{" "}
              {palestrante["IE que representa"] || "Não informado"}
            </p>

            <p>
              <strong>Celular:</strong>{" "}
              {palestrante.Celular || "Não informado"}
            </p>

          </Link>

        ))}

      </div>


      {/* NENHUM RESULTADO */}

      {palestrantesFiltrados.length === 0 && (

        <div className="nenhum-resultado">
          <p>Nenhum palestrante encontrado.</p>
        </div>

      )}

    </div>
  );
}

export default Palestrantes;