import React, { useState } from 'react';
import { deleteGrup } from '../services/GrupController';
import { useNavigate } from 'react-router-dom';

function GrupDelete({ grupId, onUpdate }) {
  const [confirmation, setConfirmation] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  async function handleDelete() {
    if (confirmation === 'borrar') {
      try {
        await deleteGrup(grupId);
        alert('Grupo eliminado correctamente.');
        onUpdate();
        navigate('/grups');
      } catch (error) {
        console.error('Error al eliminar el grupo:', error);
        alert('Error al eliminar el grupo.');
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
    <div className="grup-delete">
      {showConfirmation && (
        <input
          type="text"
          placeholder="Escribe 'borrar' para confirmar"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          className="grup-delete__confirmation"
        />
      )}
      <button onClick={handleButtonClick} className="grup-delete__button">
        {showConfirmation ? 'Eliminar definitivamente' : 'Eliminar grupo'}
      </button>
    </div>
  );
}

export default GrupDelete;
