import React from "react";
import PlantillaList from "../components/Plantilles/PlantillaList";
import PlantillaForm from "../components/Plantilles/PlantillaForm";
import { createPlantilla } from "../services/PlantillaController";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import "../styles/PlantillaPage.css";

function PlantillaCreate() {
  const { userId } = useUserContext();

  const navigate = useNavigate();

  async function handleCreate(plantilla) {
    try {
      await createPlantilla(plantilla);
      navigate("/plantillas");
    } catch (error) {
      console.error("Error creant la plantilla:", error);
    }
  }

  return (
    <div className="plantilla-form-container">
      <h1 className="plantilla-form-title">NOVA PLANTILLA</h1>
      <PlantillaForm onSubmit={handleCreate} userId={userId} />
      <Link to="/plantillas" className="plantilla-form-link">
        Tornar a la llista de plantilles
      </Link>
    </div>
  );
}

function PlantillaPage() {
  return (
    <div className="plantilla-page-container">
      <h1 className="plantilla-page-title">PLANTILLES</h1>
      <Link to="/plantillas/create" className="plantilla-page-link">
        Nova plantilla
      </Link>
      <PlantillaList />
    </div>
  );
}

export { PlantillaCreate };
export default PlantillaPage;