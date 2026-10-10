import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./pages/Inicio";

import Eventos from "./pages/Eventos";
import EventoIndividual from "./pages/EventoIndividual";

import IE from "./pages/IE";
import IEIndividual from "./pages/IEIndividual";

import Palestrantes from "./pages/Palestrantes";
import Palestrante from "./pages/Palestrante";

import Pessoas from "./pages/Pessoas";

import Publicas from "./pages/Publicas";
import PublicaIndividual from "./pages/PublicaIndividual";

import ResponsaveisAreas from "./pages/ResponsaveisAreas";
import ResponsavelAreasIndividual from "./pages/ResponsavelAreasIndividual";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================
            PÁGINA INICIAL
        ========================= */}

        <Route
          path="/"
          element={<Inicio />}
        />


        {/* =========================
            EVENTOS
        ========================= */}

        <Route
          path="/eventos"
          element={<Eventos />}
        />

        <Route
          path="/eventos/:nome"
          element={<EventoIndividual />}
        />


        {/* =========================
            INSTITUIÇÕES ESPÍRITAS
        ========================= */}

        <Route
          path="/ie"
          element={<IE />}
        />

        <Route
          path="/ie/:nome"
          element={<IEIndividual />}
        />


        {/* =========================
            PALESTRANTES
        ========================= */}

        <Route
          path="/palestrantes"
          element={<Palestrantes />}
        />

        <Route
          path="/palestrantes/:nome"
          element={<Palestrante />}
        />


        {/* =========================
            PESSOAS
        ========================= */}

        <Route
          path="/pessoas"
          element={<Pessoas />}
        />


        {/* =========================
            PÚBLICAS
        ========================= */}

        <Route
          path="/publicas"
          element={<Publicas />}
        />

        <Route
          path="/publicas/:nome"
          element={<PublicaIndividual />}
        />


        {/* =========================
            ÁREAS / RESPONSÁVEIS
        ========================= */}

        <Route
          path="/responsaveis-areas"
          element={<ResponsaveisAreas />}
        />

        <Route
          path="/responsaveis-areas/:nome"
          element={<ResponsavelAreasIndividual />}
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;