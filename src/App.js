import logo from './logo.svg';
import './App.css';
import React from "react";
import GruposList from "./grups/GruposList";
import { LoginController } from './services/login';

function App() {
  return (
    <div className="App">
      <h1>Lista de Grupos</h1>
      <GruposList />
      <LoginController props = {{email : 'erga916@vidalibarraquer.net', password : 'Admin1234@'}} />
      {/* Otros componentes y contenido */}
    </div>
  );
}

export default App;
