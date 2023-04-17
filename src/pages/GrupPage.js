import React from "react";
import GrupList from "../components/Grups/GrupList";
import { Link } from "react-router-dom";
import "../styles/GrupPage.css";

function GrupPage() {
  return (
    <div className="plantilla-page-container">
      <h1 className="plantilla-page-title">Página de grupos</h1>
      <Link to="/grups/create" className="plantilla-page-link">
        Crear nuevo grupo
      </Link>
      <GrupList />
    </div>
  );
}

export default GrupPage;
