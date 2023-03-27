import logo from './logo.svg';
import './App.css';
import React from "react";
import GruposList from "./grups/GruposList";

function App() {
  return (
    <div className="App">
      <h1>Lista de Grupos</h1>
      <GruposList />
      {/* Otros componentes y contenido */}
    </div>
  );
}

export default App;
