import React, { useState } from 'react';
import { deletePlantilla } from '../../services/PlantillaController';
import { useNavigate } from 'react-router-dom';

function PlantillaDelete({ plantillaId, onUpdate }) {
  const [confirmation, setConfirmation] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  async function handleDelete() {
    if (confirmation === 'esborrar') {
      try {
        await deletePlantilla(plantillaId);
        onUpdate();
        navigate('/plantillas');
      } catch (error) {
        console.error('Error en eliminar la plantilla:', error);
      }
    } else {
      console.error('Por favor, introduce la palabra "borrar" para confirmar la eliminación.');
    }
  }

  function handleButtonClick() {
    if (showConfirmation) {
      handleDelete();
    } else {
      setShowConfirmation(true);
    }
  }

  return (
    <div className="plantilla-delete">
      {showConfirmation && (
        <input
          type="text"
          placeholder="Escriu 'esborrar' per confirmar"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          className="plantilla-delete__confirmation"
        />
      )}
      <button onClick={handleButtonClick} className="plantilla-delete__button">
        {showConfirmation ? 'Eliminar definitivament' : 'Eliminar plantilla'}
      </button>
    </div>
  );
}

export default PlantillaDelete;