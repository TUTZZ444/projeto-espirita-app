import "../App.css";
import "../ResponsaveisAreas.css";

import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import responsaveis from "../ResponsaveisAreas.json";


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


function ResponsavelAreasIndividual() {

  const { nome } = useParams();

  const [copiado, setCopiado] = useState(false);


  const partes = nome
    ? nome.split("-")
    : [];


  const index =
    Number(partes[partes.length - 1]);


  const responsavel =
    Number.isInteger(index) &&
    index >= 0 &&
    index < responsaveis.length
      ? responsaveis[index]
      : null;


  if (!responsavel) {

    return (

      <div className="pagina-responsavel-individual">

        <Link
          to="/responsaveis-areas"
          className="voltar"
        >
          ← Voltar para responsáveis
        </Link>


        <div className="responsavel-nao-encontrado">

          <h1>
            Responsável não encontrado
          </h1>

        </div>

      </div>

    );

  }


  function copiarContato() {

    if (!responsavel["Contato"]) {
      return;
    }


    navigator.clipboard.writeText(
      String(
        responsavel["Contato"]
      ).trim()
    );


    setCopiado(true);


    setTimeout(() => {
      setCopiado(false);
    }, 2000);

  }


  return (

    <div className="pagina-responsavel-individual">


      <Link
        to="/responsaveis-areas"
        className="voltar"
      >
        ← Voltar para responsáveis
      </Link>


      <div className="detalhes-responsavel">


        <h1>
          {responsavel["Nome Completo"]
            ? responsavel["Nome Completo"]
            : "Responsável não informado"}
        </h1>


        <div className="informacoes-responsavel">


          <div className="informacao-responsavel">

            <strong>
              Área
            </strong>

            <span>
              {formatarValor(
                responsavel["Área"]
              )}
            </span>

          </div>


          <div className="informacao-responsavel">

            <strong>
              Nome da Área
            </strong>

            <span>
              {formatarValor(
                responsavel["Descrição Área"]
              )}
            </span>

          </div>


          <div className="informacao-responsavel">

            <strong>
              Instituição Espírita
            </strong>

            <span>
              {formatarValor(
                responsavel["IE"]
              )}
            </span>

          </div>


          <div className="informacao-responsavel">

            <strong>
              Contato
            </strong>

            <div className="contato-responsavel">

              <span>
                {formatarValor(
                  responsavel["Contato"]
                )}
              </span>


              {responsavel["Contato"] && (

                <button
                  className="botao-copiar-responsavel"
                  onClick={copiarContato}
                >
                  {copiado
                    ? "✓ Copiado!"
                    : "📋 Copiar"}
                </button>

              )}

            </div>

          </div>


        </div>

      </div>

    </div>

  );

}


export default ResponsavelAreasIndividual;