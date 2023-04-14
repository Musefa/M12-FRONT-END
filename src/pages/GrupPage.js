import React from "react";
import GrupList from "../components/Grups/GrupList";
import { Link } from "react-router-dom";

function GrupPage() {
  return (
    <div>
      <h1>Página de grupos</h1>
      <Link to="/grups/create">Crear nuevo grupo</Link>
      <GrupList />
    </div>
  );
}

export default GrupPage;
