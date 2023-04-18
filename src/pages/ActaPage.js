import React from "react";
import ActaList from "../components/Actas/ActaList";
import { Link } from "react-router-dom";
import "../styles/ActaPage.css";

function ActaPage() {
  return (
    <div className="plantilla-page-container">
      <h1 className="plantilla-page-title">Página de actas</h1>
      <Link to="/actas/create" className="plantilla-page-link">
        Crear nuevo acta
      </Link>
      <ActaList />
    </div>
  );
}

export default ActaPage;
