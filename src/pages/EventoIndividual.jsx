import "../App.css";
import "../EventoIndividual.css";

import { Link, useParams } from "react-router-dom";
import eventos from "../eventos.json";

function EventoIndividual() {

  const { nome } = useParams();

  // O "nome" agora é simplesmente o índice do evento
  const indice = Number(nome);

  const evento = eventos[indice];


  if (!evento) {
    return (
      <div className="pagina-evento-individual">

        <Link
          to="/eventos"
          className="voltar"
        >
          ← Voltar para eventos
        </Link>

        <h1>
          Evento não encontrado
        </h1>

      </div>
    );
  }


  return (
    <div className="pagina-evento-individual">

      <Link
        to="/eventos"
        className="voltar"
      >
        ← Voltar para eventos
      </Link>


      <div className="evento-detalhes">

        <h1>
          {evento.evento}
        </h1>


        {evento.descricao && (
          <div className="evento-info">

            <strong>
              Descrição
            </strong>

            <p>
              {evento.descricao}
            </p>

          </div>
        )}


        <div className="evento-info">

          <strong>
            Data
          </strong>

          <p>
            {evento.dataInicio || "Não informado"}

            {evento.dataFim &&
              evento.dataFim !== evento.dataInicio &&
              ` até ${evento.dataFim}`}
          </p>

        </div>


        <div className="evento-info">

          <strong>
            Horário
          </strong>

          <p>
            {evento.horaInicial || "Não informado"}

            {evento.horaFinal &&
              ` às ${evento.horaFinal}`}
          </p>

        </div>


        <div className="evento-info">

          <strong>
            Instituição organizadora
          </strong>

          <p>
            {evento.ieOrganizadora || "Não informado"}
          </p>

        </div>


        <div className="evento-info">

          <strong>
            Instituição que acolhe
          </strong>

          <p>
            {evento.ieAcolhe || "Não informado"}
          </p>

        </div>


        <div className="evento-info">

          <strong>
            Modalidade
          </strong>

          <p>

            {evento.presencial === true &&
              "Presencial"}

            {evento.presencial === true &&
              evento.online === true &&
              " + "}

            {evento.online === true &&
              "Online"}

            {!evento.presencial &&
              !evento.online &&
              "Não informado"}

          </p>

        </div>


        {evento.online === true &&
          evento.onlineComo && (

            <div className="evento-info">

              <strong>
                Como participar online
              </strong>

              <p>
                {evento.onlineComo}
              </p>

            </div>

          )}


      </div>

    </div>
  );
}

export default EventoIndividual;