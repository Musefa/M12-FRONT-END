import React from "react";
import AcordList from "../components/Acords/AcordList";
import { Link } from "react-router-dom";
import "../styles/AcordPage.css";

function AcordPage() {
  return (
    <div className="plantilla-page-container">
      <h1 className="plantilla-page-title">Página de actas</h1>
      <Link to="/acords/create" className="plantilla-page-link">
        Crear nuevo acuerdo
      </Link>
      <AcordList />
    </div>
  );
}

export default AcordPage;
