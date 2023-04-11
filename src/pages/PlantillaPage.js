import React from "react";
import PlantillaList from "../components/PlantillaList";
import PlantillaForm from "../components/PlantillaForm"; // Agrega esta línea
import { createPlantilla } from "../services/PlantillaController"; // Agrega esta línea
import { Link, useNavigate } from "react-router-dom";

function PlantillaCreate() {
  const navigate = useNavigate();

  async function handleCreate(plantilla) {
    try {
      await createPlantilla(plantilla);
      alert("Plantilla creada correctamente.");
      navigate("/plantillas");
    } catch (error) {
      console.error("Error creating plantilla:", error);
      alert("Error al crear la plantilla.");
    }
  }

  return <PlantillaForm onSubmit={handleCreate} />;
}

function PlantillaPage() {
  return (
    <div>
      <h1>Página de plantillas</h1>
      <Link to="/plantillas/create">Crear nueva plantilla</Link>
      <PlantillaList />
    </div>
  );
}

export { PlantillaCreate }; // Agrega esta línea
export default PlantillaPage;
