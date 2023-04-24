import React, { useState, useEffect } from 'react';
import { getPlantillas } from '../../services/PlantillaController';
import { Link } from 'react-router-dom';
import PlantillaDelete from './PlantillaDelete';

function PlantillaList() {
  const [plantillas, setPlantillas] = useState([]);

  useEffect(() => {
    fetchPlantillas();
  }, []);

  async function fetchPlantillas() {
    try {
      const plantillas = await getPlantillas();
      setPlantillas(plantillas);
    } catch (error) {
      console.error('Error fetching plantillas:', error);
    }
  }

  return (
    <ul className="plantilla-form__item">
      {plantillas.map((plantilla) => (
        <li key={plantilla._id}>
          Nom: {plantilla.nom}<br />
          Punts:<br /> {plantilla.puntsOrdreDia.map((punt) => (
            <>
            <span>{punt}</span> 
            <br />
            </>
          ))}
          Creador: {plantilla.creador.nom}<br />
          <Link className="plantilla-form__button" to={`/plantillas/edit/${plantilla._id}`}>Editar</Link>
          <PlantillaDelete plantillaId={plantilla._id} onUpdate={fetchPlantillas} />
        </li>
      ))}
    </ul>
  );
  
}

export default PlantillaList;