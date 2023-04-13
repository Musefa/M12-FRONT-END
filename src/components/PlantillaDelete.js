import React, { useState } from 'react';
import { deletePlantilla } from '../services/PlantillaController';
import { useNavigate } from 'react-router-dom';

function PlantillaDelete({ plantillaId, onUpdate }) {
  const [confirmation, setConfirmation] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  async function handleDelete() {
    if (confirmation === 'borrar') {
      try {
        await deletePlantilla(plantillaId);
        alert('Plantilla eliminada correctamente.');
        onUpdate(); // Llama a la función de actualización
        navigate('/plantillas');
      } catch (error) {
        console.error('Error al eliminar la plantilla:', error);
        alert('Error al eliminar la plantilla.');
      }
    } else {
      alert('Por favor, introduce la palabra "borrar" para confirmar la eliminación.');
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
          placeholder="Escribe 'borrar' para confirmar"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          className="plantilla-delete__confirmation"
        />
      )}
      <button onClick={handleButtonClick} className="plantilla-delete__button">
        {showConfirmation ? 'Eliminar definitivamente' : 'Eliminar plantilla'}
      </button>
    </div>
  );
}

export default PlantillaDelete;
