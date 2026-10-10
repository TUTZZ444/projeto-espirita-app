import "../App.css";
import "../ResponsaveisAreas.css";

import { Link } from "react-router-dom";
import { useState } from "react";

import responsaveis from "../ResponsaveisAreas.json";


function criarSlug(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}


function ResponsaveisAreas() {

  const [pesquisa, setPesquisa] = useState("");


  const resultados = responsaveis.filter(item => {

    const termo = pesquisa
      .toLowerCase()
      .trim();

    if (!termo) {
      return true;
    }

    return (
      String(item["Nome Completo"] || "")
        .toLowerCase()
        .includes(termo)

      ||

      String(item["Nome"] || "")
        .toLowerCase()
        .includes(termo)

      ||

      String(item["Área"] || "")
        .toLowerCase()
        .includes(termo)

      ||

      String(item["Descrição Área"] || "")
        .toLowerCase()
        .includes(termo)

      ||

      String(item["IE"] || "")
        .toLowerCase()
        .includes(termo)
    );

  });


  return (

    <div className="pagina-responsaveis">


      <Link
        to="/"
        className="voltar"
      >
        ← Página inicial
      </Link>


      <div className="cabecalho-responsaveis">

        <h1>
          Responsáveis pelas Áreas
        </h1>

        <p>
          Consulte os responsáveis pelas áreas
          e suas respectivas instituições.
        </p>

      </div>


      <div className="pesquisa-responsaveis">

        <input
          type="text"
          placeholder="Pesquisar por nome, área ou instituição..."
          value={pesquisa}
          onChange={e =>
            setPesquisa(e.target.value)
          }
        />

        <span>
          🔍
        </span>

      </div>


      <div className="grid-responsaveis">

        {resultados.map((item, index) => {

          const nomeParaSlug =
            item["Nome Completo"] ||
            item["Nome"] ||
            `responsavel-${index}`;

          const slug =
            criarSlug(nomeParaSlug);


          return (

            <Link
              to={`/responsaveis-areas/${slug}-${index}`}
              className="card-responsavel"
              key={index}
            >

              <div className="card-area">
                {item["Área"] ||
                  "Área não informada"}
              </div>


              <h2>
                {item["Nome"] ||
                  item["Nome Completo"] ||
                  "Responsável não informado"}
              </h2>


              <p>
                <strong>
                  IE:
                </strong>{" "}
                {item["IE"] ||
                  "Não informado"}
              </p>


              <p>
                {item["Descrição Área"] ||
                  "Área não informada"}
              </p>


              <div className="seta-responsavel">
                →
              </div>

            </Link>

          );

        })}

      </div>


      {resultados.length === 0 && (

        <div className="nenhum-responsavel">
          Nenhum responsável encontrado.
        </div>

      )}

    </div>

  );
}


export default ResponsaveisAreas;