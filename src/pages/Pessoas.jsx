import "../App.css";
import "../Pessoas.css";

import { Link } from "react-router-dom";
import { useState } from "react";

import pessoas from "../pessoas.json";


function formatarValor(valor) {

  if (typeof valor === "boolean") {
    return valor ? "Sim" : "Não";
  }

  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {
    return "Não informado";
  }

  return valor;
}


function formatarCampo(campo) {

  const nomes = {

    "Nome Completo": "Nome completo",
    "nomeCompleto": "Nome completo",

    "IE": "IE",
    "ie": "IE",

    "celular": "Celular",
    "Celular": "Celular",

    "telefone": "Telefone",
    "Telefone": "Telefone",

    "email": "E-mail",
    "e-mail": "E-mail"

  };


  if (nomes[campo]) {
    return nomes[campo];
  }


  return campo
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, letra =>
      letra.toUpperCase()
    );

}


function Pessoas() {

  const [pesquisa, setPesquisa] = useState("");

  const [copiado, setCopiado] = useState(null);


  /* =========================
     PESQUISA
  ========================= */

  const resultados = pessoas.filter(pessoa => {

    const texto =
      pesquisa.toLowerCase();


    return Object.values(pessoa).some(valor =>

      String(valor || "")
        .toLowerCase()
        .includes(texto)

    );

  });


  /* =========================
     COPIAR CELULAR
  ========================= */

  function copiarCelular(numero, index) {

    if (!numero) {
      return;
    }


    navigator.clipboard
      .writeText(String(numero))
      .then(() => {

        setCopiado(index);


        setTimeout(() => {
          setCopiado(null);
        }, 2000);

      });

  }


  return (

    <div className="pagina-pessoas">


      {/* =========================
          VOLTAR
      ========================= */}

      <Link
        to="/"
        className="voltar-pessoas"
      >
        ← Voltar para página inicial
      </Link>


      {/* =========================
          CABEÇALHO
      ========================= */}

      <div className="cabecalho-pessoas">

        <h1>
          Pessoas
        </h1>

        <p>
          Consulte as pessoas cadastradas
        </p>

      </div>


      {/* =========================
          PESQUISA
      ========================= */}

      <div className="pesquisa-pessoas">

        <input
          type="text"
          placeholder="Pesquisar por nome, cidade, IE..."
          value={pesquisa}
          onChange={e =>
            setPesquisa(e.target.value)
          }
        />

        <span>
          🔎
        </span>

      </div>


      {/* =========================
          CARDS
      ========================= */}

      {resultados.length > 0 ? (

        <div className="grid-pessoas">

          {resultados.map((pessoa, index) => {


            const nomeAbreviado =
              pessoa.Nome ||
              pessoa.nome ||
              pessoa["Nome Abreviado"] ||
              "Sem nome";


            return (

              <div
                key={index}
                className="card-pessoa"
              >


                {/* =========================
                    NOME ABREVIADO
                ========================= */}

                <h2>
                  {nomeAbreviado}
                </h2>


                {/* =========================
                    INFORMAÇÕES
                ========================= */}

                <div className="informacoes-pessoa">

                  {Object.entries(pessoa).map(
                    ([chave, valor]) => {


                      /* NÃO REPETIR NOME */

                      if (
                        chave === "Nome" ||
                        chave === "nome" ||
                        chave === "Nome Abreviado"
                      ) {
                        return null;
                      }


                      /* NÃO MOSTRAR VAZIOS */

                      if (
                        valor === null ||
                        valor === undefined ||
                        valor === ""
                      ) {
                        return null;
                      }


                      const ehCelular =
                        chave === "Celular" ||
                        chave === "celular";


                      return (

                        <div
                          className="informacao-pessoa"
                          key={chave}
                        >

                          <strong>
                            {formatarCampo(chave)}
                          </strong>


                          {ehCelular ? (

                            <div className="contato-pessoa">

                              <span>
                                {formatarValor(valor)}
                              </span>


                              <button
                                type="button"
                                className="botao-copiar-pessoa"
                                onClick={() =>
                                  copiarCelular(
                                    valor,
                                    index
                                  )
                                }
                              >

                                {copiado === index
                                  ? "✓ Copiado!"
                                  : "📋 Copiar"}

                              </button>

                            </div>

                          ) : (

                            <span>
                              {formatarValor(valor)}
                            </span>

                          )}

                        </div>

                      );

                    }
                  )}

                </div>


              </div>

            );

          })}

        </div>

      ) : (

        <div className="nenhum-resultado-pessoas">

          <h2>
            Nenhuma pessoa encontrada
          </h2>

          <p>
            Tente pesquisar por outro nome
            ou informação.
          </p>

        </div>

      )}

    </div>

  );

}


export default Pessoas;