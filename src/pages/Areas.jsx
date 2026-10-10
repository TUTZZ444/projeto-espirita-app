import "../App.css";
import "../Areas.css";

import { Link } from "react-router-dom";

function Areas() {

  const areas = [
    {
      sigla: "ACSE",
      nome: "Área de Comunicação Social Espírita"
    },
    {
      sigla: "AREE-EI",
      nome: "Evangelização Infância"
    },
    {
      sigla: "AREE-EJ",
      nome: "Evangelização Juventude"
    },
    {
      sigla: "AREE-EF",
      nome: "Evangelização Família"
    },
    {
      sigla: "AREE-AF",
      nome: "Área da Família"
    },
    {
      sigla: "AREE-M",
      nome: "Área Mediúnica"
    }
  ];


  return (

    <div className="pagina-areas">

      {/* =========================
          VOLTAR
      ========================= */}

      <Link
        to="/"
        className="voltar-areas"
      >
        ← Voltar para página inicial
      </Link>


      {/* =========================
          CABEÇALHO
      ========================= */}

      <div className="areas-cabecalho">

        <h1>Áreas</h1>

      </div>


      {/* =========================
          CARDS
      ========================= */}

      <div className="grid-areas">

        {areas.map(area => (

          <div
            className="card-area"
            key={area.sigla}
          >

            <span className="sigla-area">
              {area.sigla}
            </span>

            <h2>
              {area.nome}
            </h2>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Areas;