import "../App.css";
import "../IE.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import instituicoes from "../ie.json";


function normalizarTexto(texto) {
  return String(texto || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}


function criarSlug(nome) {
  return normalizarTexto(nome)
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
}


function IE() {
  const [pesquisa, setPesquisa] = useState("");


  const pesquisaNormalizada =
    normalizarTexto(pesquisa);


  const instituicoesFiltradas =
    instituicoes.filter((instituicao) => {

      const nome =
        normalizarTexto(instituicao.nome);

      const sigla =
        normalizarTexto(instituicao.sigla);

      const cidade =
        normalizarTexto(instituicao.cidade);

      const nucleo =
        normalizarTexto(instituicao.nucleo);

      return (
        nome.includes(pesquisaNormalizada) ||
        sigla.includes(pesquisaNormalizada) ||
        cidade.includes(pesquisaNormalizada) ||
        nucleo.includes(pesquisaNormalizada)
      );
    });


  return (
    <div className="pagina-ie">

      {/* VOLTAR */}

      <Link
        to="/"
        className="voltar-inicio"
      >
        ← Página inicial
      </Link>


      {/* TÍTULO */}

      <h1>
        Instituições Espíritas
      </h1>


      {/* PESQUISA */}

      <div className="pesquisa-ie-container">

        <input
          type="text"
          className="pesquisa-ie"
          placeholder="Pesquisar instituição..."
          value={pesquisa}
          onChange={(e) =>
            setPesquisa(e.target.value)
          }
        />

        <span className="icone-pesquisa-ie">
          🔍
        </span>

      </div>


      {/* LISTA */}

      <div className="grid-ie">

        {instituicoesFiltradas.map(
          (instituicao, index) => (

            <Link
              key={
                instituicao.cnpj ||
                instituicao.sigla ||
                index
              }

              to={`/ie/${criarSlug(
                instituicao.nome
              )}`}

              className="card-ie"
            >

              <div className="card-ie-topo">

                <h2>
                  {instituicao.nome}
                </h2>

                {instituicao.sigla && (
                  <span className="sigla-ie">
                    {instituicao.sigla}
                  </span>
                )}

              </div>


              {instituicao.nucleo && (

                <p>
                  <strong>Núcleo:</strong>{" "}
                  {instituicao.nucleo}
                </p>

              )}


              {instituicao.cidade && (

                <p>
                  <strong>Cidade:</strong>{" "}
                  {instituicao.cidade}
                </p>

              )}


              {instituicao.endereco && (

                <p className="endereco-card-ie">
                  {instituicao.endereco}
                </p>

              )}

            </Link>

          )
        )}

      </div>


      {/* NENHUM RESULTADO */}

      {instituicoesFiltradas.length === 0 && (

        <div className="nenhum-resultado-ie">

          <p>
            Nenhuma instituição encontrada.
          </p>

        </div>

      )}

    </div>
  );
}


export default IE;