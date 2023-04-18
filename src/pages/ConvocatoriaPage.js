import React from "react";
import ConvocatoriaList from "../components/Convocatorias/ConvocatoriaList";
import { Link } from "react-router-dom";
import "../styles/ConvocatoriaPage.css";

function ConvocatoriaPage() {
  return (
    <div className="plantilla-page-container">
      <h1 className="plantilla-page-title">Página de convocatorias</h1>
      <Link to="/convocatorias/create" className="plantilla-page-link">
        Crear nueva convocatoria
      </Link>
      <ConvocatoriaList />
    </div>
  );
}

export default ConvocatoriaPage;
