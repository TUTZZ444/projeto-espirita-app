import "../App.css";
import "../Eventos.css";

import { Link } from "react-router-dom";
import eventos from "../eventos.json";

function Eventos() {
  return (
    <div className="pagina-eventos">

      <Link
        to="/"
        className="voltar"
      >
        ← Voltar para página inicial
      </Link>

      <h1>Eventos</h1>

      <div className="grid-eventos">

        {eventos.map((evento, index) => (

          <Link
            key={index}
            to={`/eventos/${index}`}
            className="card-evento"
          >

            <h2>
              {evento.evento || "Evento sem nome"}
            </h2>

            {evento.descricao && (
              <p className="evento-descricao">
                {evento.descricao}
              </p>
            )}

            {evento.dataInicio && (
              <p>
                <strong>📅 Data:</strong>{" "}
                {evento.dataInicio}

                {evento.dataFim &&
                  evento.dataFim !== evento.dataInicio &&
                  ` até ${evento.dataFim}`}
              </p>
            )}

            {evento.horaInicial && (
              <p>
                <strong>🕐 Horário:</strong>{" "}
                {evento.horaInicial}

                {evento.horaFinal &&
                  ` às ${evento.horaFinal}`}
              </p>
            )}

            {evento.ieOrganizadora && (
              <p>
                <strong>🏛️ Organização:</strong>{" "}
                {evento.ieOrganizadora}
              </p>
            )}

            {evento.ieAcolhe && (
              <p>
                <strong>📍 Acolhimento:</strong>{" "}
                {evento.ieAcolhe}
              </p>
            )}

            <div className="evento-modalidade">

              {evento.presencial === true && (
                <span className="presencial">
                  Presencial
                </span>
              )}

              {evento.online === true && (
                <span className="online">
                  Online
                </span>
              )}

            </div>

            <span className="ver-detalhes">
              Ver detalhes →
            </span>

          </Link>

        ))}

      </div>

    </div>
  );
}

export default Eventos;