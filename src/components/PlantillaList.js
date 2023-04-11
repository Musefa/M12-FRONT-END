import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPlantillas } from "../services/PlantillaController";

function PlantillaList() {
  const [plantillas, setPlantillas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPlantillas();
        setPlantillas(data);
      } catch (error) {
        console.error("Error fetching plantillas:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Listado de plantillas</h2>
      <ul>
        {plantillas.map((plantilla) => (
          <li key={plantilla._id}>
            {plantilla.nom}{" "}
            <Link to={`/plantillas/edit/${plantilla._id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlantillaList;
