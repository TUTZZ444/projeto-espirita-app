import "../App.css";
import "../Inicio.css";

function Inicio() {

  return (

    <div className="pagina-inicio">

      <div className="inicio-cabecalho">

        <h1>
          Projeto Espírita
        </h1>

        <p>
          Selecione uma seção para continuar
        </p>

      </div>


      <div className="menu-inicio">


        {/* ÁREAS E RESPONSÁVEIS */}

        <a
          href="/responsaveis-areas"
          className="botao-secao"
        >

          <span className="texto-botao">
            Áreas e Responsáveis
          </span>

          <span className="seta">
            →
          </span>

        </a>


        {/* EVENTOS */}

        <a
          href="/eventos"
          className="botao-secao"
        >

          <span className="texto-botao">
            Eventos
          </span>

          <span className="seta">
            →
          </span>

        </a>


        {/* IE */}

        <a
          href="/ie"
          className="botao-secao"
        >

          <span className="texto-botao">
            IE
          </span>

          <span className="seta">
            →
          </span>

        </a>


        {/* PALESTRANTES */}

        <a
          href="/palestrantes"
          className="botao-secao"
        >

          <span className="texto-botao">
            Palestrantes
          </span>

          <span className="seta">
            →
          </span>

        </a>


        {/* PESSOAS */}

        <a
          href="/pessoas"
          className="botao-secao"
        >

          <span className="texto-botao">
            Pessoas
          </span>

          <span className="seta">
            →
          </span>

        </a>


        {/* PÚBLICAS */}

        <a
          href="/publicas"
          className="botao-secao"
        >

          <span className="texto-botao">
            Públicas
          </span>

          <span className="seta">
            →
          </span>

        </a>


      </div>

    </div>

  );

}


export default Inicio;