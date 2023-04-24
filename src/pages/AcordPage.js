import React from "react";
import AcordList from "../components/Acords/AcordList";
import { Link } from "react-router-dom";
import "../styles/AcordPage.css";

function AcordPage() {
  return (
    <div className="acord-page-container">
      <h1 className="acord-page-title">Página d' acords</h1>
      <Link to="/acords/create" className="acord-page-link">
        Crear nuevo acuerdo
      </Link>
      <AcordList />
    </div>
  );
}

export default AcordPage;
