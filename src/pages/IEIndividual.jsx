import "../App.css";
import "../IEIndividual.css";

import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import instituicoes from "../ie.json";


function criarSlug(nome) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
}


function formatarNome(nome) {

  const nomes = {
    adesa: "Adesa",
    dataFundacao: "Data de Fundação",
    contatoPrincipal: "Contato Principal",
    nucleo: "Núcleo",
    endereco: "Endereço",
    cidade: "Cidade",
    uf: "UF",
    cep: "CEP",
    referencias: "Referências",
    cnpj: "CNPJ",
    googleMaps: "Google Maps"
  };

  return nomes[nome] || nome;
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


function IEIndividual() {

  const { nome } = useParams();

  const [copiadoMaps, setCopiadoMaps] = useState(false);


  /* =========================
     ENCONTRA A INSTITUIÇÃO
  ========================= */

  const instituicao = instituicoes.find(
    ie => criarSlug(ie.nome) === nome
  );


  /* =========================
     COPIAR GOOGLE MAPS
  ========================= */

  function copiarGoogleMaps(link) {

    navigator.clipboard.writeText(String(link));

    setCopiadoMaps(true);

    setTimeout(() => {
      setCopiadoMaps(false);
    }, 2000);
  }


  /* =========================
     INSTITUIÇÃO NÃO ENCONTRADA
  ========================= */

  if (!instituicao) {

    return (

      <div className="pagina-ie-individual">

        <Link
          to="/ie"
          className="voltar-ie"
        >
          ← Voltar para IE
        </Link>


        <div className="ie-nao-encontrado">

          <h1>
            Instituição não encontrada
          </h1>

          <p>
            A instituição que você tentou acessar
            não existe ou foi removida.
          </p>

        </div>

      </div>

    );
  }


  return (

    <div className="pagina-ie-individual">


      {/* =========================
          VOLTAR
      ========================= */}

      <Link
        to="/ie"
        className="voltar-ie"
      >
        ← Voltar para IE
      </Link>


      {/* =========================
          PERFIL
      ========================= */}

      <div className="perfil-ie">


        {/* =========================
            NOME + SIGLA
        ========================= */}

        <h1>

          {instituicao.nome}

          {instituicao.sigla && (

            <span className="sigla-ao-lado">
              {" "}({instituicao.sigla})
            </span>

          )}

        </h1>


        {/* =========================
            INFORMAÇÕES
        ========================= */}

        <div className="informacoes-ie">

          {Object.entries(instituicao).map(
            ([chave, valor]) => {


              /* =========================
                 OCULTAR CAMPOS
              ========================= */

              if (
                chave === "nome" ||
                chave === "sigla" ||
                chave === "idade" ||
                chave === "celular"
              ) {
                return null;
              }


              /* =========================
                 CONTATO PRINCIPAL
              ========================= */

              if (
                chave === "contatoPrincipal"
              ) {

                return (

                  <div
                    className="informacao-ie"
                    key={chave}
                  >

                    <strong>
                      Contato Principal
                    </strong>


                    <span>

                      {instituicao.contatoPrincipal
                        ? instituicao.contatoPrincipal
                        : "Não informado"}

                      {instituicao.celular && (
                        <>
                          {" — "}
                          {instituicao.celular}
                        </>
                      )}

                    </span>

                  </div>

                );
              }


              /* =========================
                 GOOGLE MAPS
              ========================= */

              if (chave === "googleMaps") {

                return (

                  <div
                    className="informacao-ie"
                    key={chave}
                  >

                    <strong>
                      Google Maps
                    </strong>


                    {valor ? (

                      <div className="maps-link-container">


                        <a
                          href={valor}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="maps-link"
                        >
                          📍 Abrir no Google Maps
                        </a>


                        <button
                          className="botao-copiar"
                          onClick={() =>
                            copiarGoogleMaps(valor)
                          }
                        >

                          {copiadoMaps
                            ? "✓ Copiado!"
                            : "📋 Copiar"}

                        </button>


                      </div>

                    ) : (

                      <span>
                        Não informado
                      </span>

                    )}

                  </div>

                );
              }


              /* =========================
                 INFORMAÇÃO NORMAL
              ========================= */

              return (

                <div
                  className="informacao-ie"
                  key={chave}
                >

                  <strong>
                    {formatarNome(chave)}
                  </strong>


                  <span>
                    {formatarValor(valor)}
                  </span>

                </div>

              );

            }
          )}

        </div>

      </div>

    </div>

  );
}


export default IEIndividual;