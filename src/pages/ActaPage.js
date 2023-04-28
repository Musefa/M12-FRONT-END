import React from "react";
import ActaList from "../components/Actas/ActaList";
import { Link } from "react-router-dom";
import "../styles/ActaPage.css";

function ActaPage() {
  return (
    <div className="acta-page-container">
      <h1 className="acta-page-title">ACTES</h1>
      <Link to="/actas/create" className="acta-page-link">
        Nova acta
      </Link>
      <ActaList />
    </div>
  );
}

export default ActaPage;
