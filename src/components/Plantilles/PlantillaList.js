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
      console.error('Error cercant plantilles:', error);
    }
  }

return (
  <table className="plantilla-form__table">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Punts del dia</th>
        <th>Creador</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {plantillas.map((plantilla) => (
        <tr className="plantilla-form__row" key={plantilla._id}>
          <td>{plantilla.nom}</td>
          <td>
            {plantilla.puntsOrdreDia.map((punt, index) => (
              <React.Fragment key={index}>
                <span>{punt}</span>
                <br />
              </React.Fragment>
            ))}
          </td>
          <td>{plantilla.creador.nom}</td>
          <td>
            <Link className="plantilla-form__button" to={`/plantillas/edit/${plantilla._id}`}>Editar</Link>
            <PlantillaDelete plantillaId={plantilla._id} onUpdate={fetchPlantillas} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);


}

export default PlantillaList;