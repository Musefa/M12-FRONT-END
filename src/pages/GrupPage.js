import React from "react";
import GrupList from "../components/GrupList";
import GrupForm from "../components/GrupForm"; // Agrega esta línea
import { createGrup } from "../services/GrupController"; // Agrega esta línea
import { Link, useNavigate } from "react-router-dom";

function GrupCreate() {
  const navigate = useNavigate();

  async function handleCreate(grup) {
    try {
      await createGrup(grup);
      alert("Grupo creado correctamente.");
      navigate("/grups");
    } catch (error) {
      console.error("Error creating grup:", error);
      alert("Error al crear el grupo.");
    }
  }

  return <GrupForm onSubmit={handleCreate} />;
}

function GrupPage() {
  return (
    <div>
      <h1>Página de grupos</h1>
      <Link to="/grups/create">Crear nuevo grupo</Link>
      <GrupList />
    </div>
  );
}

export { GrupCreate }; // Agrega esta línea
export default GrupPage;
