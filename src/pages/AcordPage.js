import React from "react";
import AcordList from "../components/Acords/AcordList";
import { Link } from "react-router-dom";
import "../styles/AcordPage.css";

function AcordPage() {
  return (
    <div className="acord-page-container">
      <h1 className="acord-page-title">Acords</h1>
      <Link to="/acords/create" className="acord-page-link">
        Nou acord
      </Link>
      <AcordList />
    </div>
  );
}

export default AcordPage;
