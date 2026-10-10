import "../App.css";
import "../PublicaIndividual.css";

import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import publicas from "../publicas.json";


function PublicaIndividual() {

  const { nome } = useParams();

  const [copiado, setCopiado] = useState(false);


  /* =========================
     ENCONTRAR PÚBLICA
  ========================= */

  const partes = nome
    ? nome.split("-")
    : [];

  const index = Number(
    partes[partes.length - 1]
  );

  const publica =
    Number.isInteger(index) &&
    index >= 0 &&
    index < publicas.length
      ? publicas[index]
      : null;


  /* =========================
     CASO NÃO ENCONTRE
  ========================= */

  if (!publica) {

    return (
      <div className="pagina-publica-individual">

        <Link
          to="/publicas"
          className="voltar"
        >
          ← Voltar para públicas
        </Link>

        <div className="publica-nao-encontrada">

          <h1>
            Pública não encontrada
          </h1>

          <p>
            A atividade que você tentou acessar
            não foi encontrada.
          </p>

        </div>

      </div>
    );
  }


  /* =========================
     COPIAR CELULAR
  ========================= */

  function copiarCelular() {

    if (!publica["Celular"]) {
      return;
    }

    navigator.clipboard.writeText(
      String(publica["Celular"])
    );

    setCopiado(true);

    setTimeout(() => {
      setCopiado(false);
    }, 2000);
  }


  /* =========================
     FORMATAR VALOR
  ========================= */

  function formatarValor(valor) {

    if (
      valor === null ||
      valor === undefined ||
      valor === ""
    ) {
      return "Não informado";
    }

    return valor;
  }


  return (

    <div className="pagina-publica-individual">


      {/* =========================
          VOLTAR
      ========================= */}

      <Link
        to="/publicas"
        className="voltar"
      >
        ← Voltar para públicas
      </Link>


      {/* =========================
          QUADRADO PRINCIPAL
      ========================= */}

      <div className="detalhes-publica">


        {/* =========================
            TÍTULO
        ========================= */}

        <h1>
          {formatarValor(
            publica["Atividade Foco"]
          )}
        </h1>


        <div className="informacoes-publica">

          {/* =========================
              NOME DO CONTATO
          ========================= */}

          <div className="informacao-publica">

            <strong>
              Nome do contato
            </strong>

            <span>
              {formatarValor(
                publica["Nome Contato"]
              )}
            </span>

          </div>


          {/* =========================
              CELULAR
          ========================= */}

          <div className="informacao-publica">

            <strong>
              Celular
            </strong>

            <div className="telefone-publica">

              <span>
                {formatarValor(
                  publica["Celular"]
                )}
              </span>

              {publica["Celular"] && (

                <button
                  className="botao-copiar-publica"
                  onClick={copiarCelular}
                >
                  {copiado
                    ? "✓ Copiado!"
                    : "📋 Copiar"}
                </button>

              )}

            </div>

          </div>

          {/* =========================
              INSTITUIÇÃO
          ========================= */}

          <div className="informacao-publica">

            <strong>
              Instituição Espírita
            </strong>

            <span>
              {formatarValor(
                publica["IE"]
              )}
            </span>

          </div>


          {/* =========================
              FACILITADOR
          ========================= */}

          <div className="informacao-publica">

            <strong>
              Facilitador
            </strong>

            <span>
              {formatarValor(
                publica["Facilitador"]
              )}
            </span>

          </div>


          {/* =========================
              TÍTULO IEA
          ========================= */}

          <div className="informacao-publica">

            <strong>
              Título utilizado pela IEA
            </strong>

            <span>
              {formatarValor(
                publica["Título IEA Utiliza"]
              )}
            </span>

          </div>


          {/* =========================
              ATIVIDADE FOCO
          ========================= */}

          <div className="informacao-publica">

            <strong>
              Atividade foco
            </strong>

            <span>
              {formatarValor(
                publica["Atividade Foco"]
              )}
            </span>

          </div>


          {/* =========================
              LOCAL
          ========================= */}

          <div className="informacao-publica">

            <strong>
              Local
            </strong>

            <span>
              {formatarValor(
                publica["Local"]
              )}
            </span>

          </div>


          {/* =========================
              DIA DA SEMANA
          ========================= */}

          <div className="informacao-publica">

            <strong>
              Dia da semana
            </strong>

            <span>
              {formatarValor(
                publica["Dia da Semana"]
              )}
            </span>

          </div>


          {/* =========================
              PERIODICIDADE
          ========================= */}

          <div className="informacao-publica">

            <strong>
              Periodicidade
            </strong>

            <span>
              {formatarValor(
                publica["Periodicidade"]
              )}
            </span>

          </div>


          {/* =========================
              DATA
          ========================= */}

          <div className="informacao-publica">

            <strong>
              Data
            </strong>

            <span>
              {formatarValor(
                publica["Data"]
              )}
            </span>

          </div>


          {/* =========================
              HORÁRIO INICIAL
          ========================= */}

          <div className="informacao-publica">

            <strong>
              Horário inicial
            </strong>

            <span>
              {formatarValor(
                publica["Horário Inicial"]
              )}
            </span>

          </div>


          {/* =========================
              HORÁRIO FINAL
          ========================= */}

          <div className="informacao-publica">

            <strong>
              Horário final
            </strong>

            <span>
              {formatarValor(
                publica["Horário Final"]
              )}
            </span>

          </div>


          {/* =========================
              OBSERVAÇÕES
          ========================= */}

          <div className="informacao-publica observacoes-publica">

            <strong>
              Observações
            </strong>

            <span>
              {formatarValor(
                publica["Observações"]
              )}
            </span>

          </div>


        </div>

      </div>

    </div>
  );
}


export default PublicaIndividual;