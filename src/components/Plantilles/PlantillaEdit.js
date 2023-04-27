import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPlantillas, updatePlantilla } from "../../services/PlantillaController";
import PlantillaForm from "./PlantillaForm";
import { useNavigate } from "react-router-dom";


function PlantillaEdit() {
  const [plantilla, setPlantilla] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPlantilla() {
      try {
        const plantillas = await getPlantillas();
        const plantillaFound = plantillas.find((p) => p._id === id);
        if (plantillaFound) {
          setPlantilla(plantillaFound);
        }
      } catch (error) {
        console.error("Error cercant plantilla:", error);
      }
    }

    fetchPlantilla();
  }, [id]);

  async function handleSubmit(updatedPlantilla) {
    try {
      await updatePlantilla(id, updatedPlantilla);
      navigate("/plantillas");
    } catch (error) {
      console.error("Error actualitzant plantilla:", error);
    }
  }

  return (
    <div className="plantilla-form-container">
      <h2>EDITAR PLANTILLA</h2>
      {plantilla ? (
        <PlantillaForm onSubmit={handleSubmit} initialPlantilla={plantilla} />
      ) : (
        <p>Carregant plantilla...</p>
      )}
    </div>
  );
}

export default PlantillaEdit;