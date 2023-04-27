import React from "react";
import GrupList from "../components/Grups/GrupList";
import { Link } from "react-router-dom";
import "../styles/GrupPage.css";

function GrupPage() {
  return (
    <div className="grup-page-container">
      <h1 className="grup-page-title">GRUPS</h1>
      <Link to="/grups/create" className="grup-page-link">
        Nou grup
      </Link>
      <GrupList />
    </div>
  );
}

export default GrupPage;
