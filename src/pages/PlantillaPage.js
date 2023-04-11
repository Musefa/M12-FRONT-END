import React from "react";
import PlantillaList from "../components/PlantillaList";
import PlantillaForm from "../components/PlantillaForm"; // Agrega esta línea
import { createPlantilla } from "../services/PlantillaController"; // Agrega esta línea

function PlantillaPage() {
  async function handleCreate(plantilla) {
    try {
      await createPlantilla(plantilla);
      alert("Plantilla creada correctamente.");
    } catch (error) {
      console.error("Error creating plantilla:", error);
      alert("Error al crear la plantilla.");
    }
  }

  return (
    <div>
      <h1>Página de plantillas</h1>
      <h2>Crear nueva plantilla</h2>
      <PlantillaForm onSubmit={handleCreate} />
      <PlantillaList />
    </div>
  );
}

export default PlantillaPage;
