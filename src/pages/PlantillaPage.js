import React from "react";
import PlantillaList from "../components/PlantillaList";
import PlantillaForm from "../components/PlantillaForm";
import { createPlantilla } from "../services/PlantillaController";
import { Link, useNavigate } from "react-router-dom";
import "../styles/PlantillaPage.css";

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

  return (
    <div className="plantilla-form-container">
      <h1 className="plantilla-form-title">Crear nueva plantilla</h1>
      <PlantillaForm onSubmit={handleCreate} />
      <Link to="/plantillas" className="plantilla-form-link">
        Volver a la lista de plantillas
      </Link>
    </div>
  );
}

function PlantillaPage() {
  return (
    <div className="plantilla-page-container">
      <h1 className="plantilla-page-title">Página de plantillas</h1>
      <Link to="/plantillas/create" className="plantilla-page-link">
        Crear nueva plantilla
      </Link>
      <PlantillaList />
    </div>
  );
}

export { PlantillaCreate };
export default PlantillaPage;