import "../App.css";
import "../Palestrante.css";

import instituicoes from "../ie.json";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import palestrantes from "../palestrantes.json";


function criarSlug(nome) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
}


function formatarNome(nome) {
  return nome
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, letra => letra.toUpperCase());
}


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


function Palestrante() {

  const { nome } = useParams();

  const [copiado, setCopiado] = useState(false);


  /* =========================
     ENCONTRA PALESTRANTE
  ========================= */

  const palestrante = palestrantes.find(
    p => criarSlug(p.Nome) === nome
  );


  /* =========================
     ENCONTRA A INSTITUIÇÃO
  ========================= */

  const instituicao = instituicoes.find(
    ie =>
      ie.sigla &&
      palestrante?.["IE que representa"] &&
      ie.sigla.trim().toLowerCase() ===
        palestrante["IE que representa"]
          .trim()
          .toLowerCase()
  );


  /* =========================
     PALESTRANTE NÃO ENCONTRADO
  ========================= */

  if (!palestrante) {

    return (
      <div className="pagina-palestrante">

        <h1>
          Palestrante não encontrado
        </h1>

        <Link
          to="/palestrantes"
          className="voltar"
        >
          ← Voltar para palestrantes
        </Link>

      </div>
    );
  }


  /* =========================
     COPIAR TELEFONE
  ========================= */

  function copiarTelefone(telefone) {

    navigator.clipboard.writeText(
      String(telefone)
    );

    setCopiado(true);

    setTimeout(() => {
      setCopiado(false);
    }, 2000);
  }


  /* =========================
     AGENDA
  ========================= */

  const dias = [

    {
      nome: "Domingo",

      horarios: [
        {
          nome: "Manhã",
          campo: "DomMan"
        },
        {
          nome: "Tarde",
          campo: "DomTar"
        },
        {
          nome: "Noite",
          campo: "DomNoi"
        }
      ]
    },


    {
      nome: "Segunda-feira",

      horarios: [
        {
          nome: "Manhã",
          campo: "SegMan"
        },
        {
          nome: "Tarde",
          campo: "SegTar"
        },
        {
          nome: "Noite",
          campo: "SegNoi"
        }
      ]
    },


    {
      nome: "Terça-feira",

      horarios: [
        {
          nome: "Manhã",
          campo: "TerMan"
        },
        {
          nome: "Tarde",
          campo: "TerTar"
        },
        {
          nome: "Noite",
          campo: "TerNoi"
        }
      ]
    },


    {
      nome: "Quarta-feira",

      horarios: [
        {
          nome: "Manhã",
          campo: "QuaMan"
        },
        {
          nome: "Tarde",
          campo: "QuaTar"
        },
        {
          nome: "Noite",
          campo: "QuaNoi"
        }
      ]
    },


    {
      nome: "Quinta-feira",

      horarios: [
        {
          nome: "Manhã",
          campo: "QuiMan"
        },
        {
          nome: "Tarde",
          campo: "QuinTar"
        },
        {
          nome: "Noite",
          campo: "QuiNoi"
        }
      ]
    },


    {
      nome: "Sexta-feira",

      horarios: [
        {
          nome: "Manhã",
          campo: "SexMan"
        },
        {
          nome: "Tarde",
          campo: "SexTar"
        },
        {
          nome: "Noite",
          campo: "SexNoi"
        }
      ]
    },


    {
      nome: "Sábado",

      horarios: [
        {
          nome: "Manhã",
          campo: "SabMan"
        },
        {
          nome: "Tarde",
          campo: "SabTar"
        },
        {
          nome: "Noite",
          campo: "SabNoi"
        }
      ]
    }

  ];


  /* =========================
     CAMPOS DA AGENDA
  ========================= */

  const horarios = [

    "DomMan",
    "DomTar",
    "DomNoi",

    "SegMan",
    "SegTar",
    "SegNoi",

    "TerMan",
    "TerTar",
    "TerNoi",

    "QuaMan",
    "QuaTar",
    "QuaNoi",

    "QuiMan",
    "QuinTar",
    "QuiNoi",

    "SexMan",
    "SexTar",
    "SexNoi",

    "SabMan",
    "SabTar",
    "SabNoi"

  ];


  /* =========================
     VERIFICA SE TEM AGENDA
  ========================= */

  const temAgenda = horarios.some(
    horario =>
      palestrante[horario] === true
  );


  /* =========================
     CAMPOS QUE NÃO APARECEM
  ========================= */

  const camposAgenda = [

    ...horarios,

    "Disponibilidade do Expositor"

  ];


  return (

    <div className="pagina-palestrante">


      {/* =========================
          VOLTAR
      ========================= */}

      <Link
        to="/palestrantes"
        className="voltar"
      >
        ← Voltar para palestrantes
      </Link>


      {/* =========================
          PERFIL
      ========================= */}

      <div className="perfil">

        <h1>
          {palestrante.Nome}
        </h1>


        <div className="informacoes">

          {Object.entries(palestrante).map(
            ([chave, valor]) => {

              /* Não mostrar nome,
                 horários ou disponibilidade */

              if (
                chave === "Nome" ||
                camposAgenda.includes(chave)
              ) {
                return null;
              }


              /* =========================
                 TELEFONE
              ========================= */

              const chaveNormalizada =
                chave.toLowerCase();


              const ehTelefone =
                chaveNormalizada.includes(
                  "telefone"
                ) ||
                chaveNormalizada.includes(
                  "celular"
                );


              /* =========================
                 VALOR DA INSTITUIÇÃO
              ========================= */

              let valorExibido =
                formatarValor(valor);


              if (
                chave === "IE que representa"
              ) {

                if (instituicao) {

                  valorExibido =
                    instituicao.nome;

                }

              }


              return (

                <div
                  className="informacao"
                  key={chave}
                >

                  <strong>
                    {formatarNome(chave)}
                  </strong>


                  {ehTelefone ? (

                    <div className="telefone">

                      <span>
                        {valorExibido}
                      </span>


                      {valor &&
                        valor !== "Não informado" && (

                          <button
                            type="button"
                            className="botao-copiar"
                            onClick={() =>
                              copiarTelefone(
                                valor
                              )
                            }
                          >
                            {copiado
                              ? "✓ Copiado!"
                              : "📋 Copiar"}
                          </button>

                        )}

                    </div>

                  ) : (

                    <span>
                      {valorExibido}
                    </span>

                  )}

                </div>

              );

            }
          )}

        </div>

      </div>


      {/* =========================
          AGENDA
      ========================= */}

      {temAgenda && (

        <div className="agenda">

          <h2>
            Agenda
          </h2>


          <div className="agenda-lista">

            {dias.map(dia => (

              <div
                className="agenda-dia"
                key={dia.nome}
              >

                <h3>
                  {dia.nome}
                </h3>


                <div className="agenda-horarios">

                  {dia.horarios.map(
                    horario => {

                      const disponivel =
                        palestrante[
                          horario.campo
                        ] === true;


                      return (

                        <div
                          key={horario.campo}
                          className={`horario ${
                            disponivel
                              ? "disponivel"
                              : "indisponivel"
                          }`}
                        >

                          <strong>
                            {horario.nome}
                          </strong>


                          <span>
                            {disponivel
                              ? "Disponível"
                              : "Indisponível"}
                          </span>

                        </div>

                      );

                    }
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      )}


      {/* =========================
          SEM AGENDA
      ========================= */}

      {!temAgenda && (

        <div className="agenda">

          <h2>
            Disponibilidade
          </h2>


          <p>
            {palestrante[
              "Disponibilidade do Expositor"
            ] ||
              "Prefiro que me contatem para combinar o Dia da Semana e o Horário."
            }
          </p>

        </div>

      )}

    </div>

  );
}


export default Palestrante;