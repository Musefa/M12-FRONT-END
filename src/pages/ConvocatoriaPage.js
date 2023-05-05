import React from "react";
import ConvocatoriaList from "../components/Convocatorias/ConvocatoriaList";
import { Link } from "react-router-dom";
import "../styles/ConvocatoriaPage.css";

function ConvocatoriaPage() {
  return (
    <div className="convocatoria-page-container">
      <h1 className="convocatoria-page-title">Convocatòries</h1>
      <Link to="/convocatorias/create" className="convocatoria-page-link">
        Nova convocatòria
      </Link>
      <ConvocatoriaList />
    </div>
  );
}

export default ConvocatoriaPage;
