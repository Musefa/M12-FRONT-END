import React, { useState, useEffect } from 'react';
import { getPlantillas } from '../services/PlantillaController';
import { Link } from 'react-router-dom';
import PlantillaDelete from './PlantillaDelete'; // Importa el componente PlantillaDelete

function PlantillaList() {
  const [plantillas, setPlantillas] = useState([]);

  useEffect(() => {
    async function fetchPlantillas() {
      try {
        const plantillas = await getPlantillas();
        setPlantillas(plantillas);
      } catch (error) {
        console.error('Error fetching plantillas:', error);
      }
    }

    fetchPlantillas();
  }, []);

  return (
    <ul>
      {plantillas.map((plantilla) => (
        <li key={plantilla._id}>
          {plantilla.nom}{" "}
          <Link to={`/plantillas/edit/${plantilla._id}`}>Editar</Link>
          {/* Agrega el componente PlantillaDelete para cada plantilla */}
          <PlantillaDelete plantillaId={plantilla._id} />
        </li>
      ))}
    </ul>
  );
}

export default PlantillaList;
