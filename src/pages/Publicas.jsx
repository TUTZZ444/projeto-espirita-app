import "../App.css";
import "../Publicas.css";

import { Link } from "react-router-dom";

import publicas from "../publicas.json";


function criarSlug(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}


function Publicas() {

  return (

    <div className="pagina-publicas">

      {/* BOTÃO VOLTAR */}

      <Link
        to="/"
        className="voltar"
      >
        ← Voltar para página inicial
      </Link>


      {/* CABEÇALHO */}

      <div className="cabecalho-publicas">

        <h1>Públicas</h1>

        <p>
          Atividades públicas disponíveis
        </p>

      </div>


      {/* CARDS */}

      <div className="grid-publicas">

        {publicas.map((publica, index) => (

          <Link
            key={index}
            to={`/publicas/${criarSlug(
              publica["Atividade Foco"]
            )}-${index}`}
            className="card-publica"
          >

            {/* TÍTULO */}

            <h2>
              {publica["Atividade Foco"] ||
                "Atividade não informada"}
            </h2>


            {/* INFORMAÇÕES PRINCIPAIS */}

            <div className="publica-info">

              <p>
                <strong>Nome:</strong>{" "}
                {publica["Nome"] ||
                  "Não informado"}
              </p>


              <p>
                <strong>Dia:</strong>{" "}
                {publica["Dia da Semana"] ||
                  "Não informado"}
              </p>


              <p>
                <strong>Horário:</strong>{" "}

                {publica["Horário Inicial"] &&
                publica["Horário Final"]
                  ? `${publica["Horário Inicial"]} - ${publica["Horário Final"]}`
                  : "Não informado"}

              </p>


              <p>
                <strong>Local:</strong>{" "}
                {publica["Local"] ||
                  "Não informado"}
              </p>


              <p>
                <strong>Periodicidade:</strong>{" "}
                {publica["Periodicidade"] ||
                  "Não informado"}
              </p>

            </div>


            {/* VER DETALHES */}

            <span className="ver-detalhes">
              Ver detalhes →
            </span>

          </Link>

        ))}

      </div>

    </div>

  );

}


export default Publicas;