import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPlantillas, updatePlantilla } from "../services/PlantillaController";
import PlantillaForm from "./PlantillaForm";

function PlantillaEdit() {
  const [plantilla, setPlantilla] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPlantilla() {
      try {
        const plantillas = await getPlantillas();
        const plantillaFound = plantillas.find((p) => p._id === id);
        if (plantillaFound) {
          setPlantilla(plantillaFound);
        }
      } catch (error) {
        console.error("Error fetching plantilla:", error);
      }
    }

    fetchPlantilla();
  }, [id]);

  async function handleSubmit(updatedPlantilla) {
    try {
      await updatePlantilla(id, updatedPlantilla);
      alert("Plantilla actualizada correctamente.");
    } catch (error) {
      console.error("Error updating plantilla:", error);
      alert("Error al actualizar la plantilla.");
    }
  }

  return (
    <div>
      <h2>Editar plantilla</h2>
      {plantilla ? (
        <PlantillaForm onSubmit={handleSubmit} initialPlantilla={plantilla} />
      ) : (
        <p>Cargando plantilla...</p>
      )}
    </div>
  );
}

export default PlantillaEdit;