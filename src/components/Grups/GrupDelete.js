import React, { useState } from 'react';
import { deleteGrup } from '../../services/GrupController';
import { useNavigate } from 'react-router-dom';

function GrupDelete({ grupId, onUpdate }) {
  const [confirmation, setConfirmation] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  async function handleDelete() {
    if (confirmation === 'esborrar') {
      try {
        await deleteGrup(grupId);
        onUpdate();
        navigate('/grups');
      } catch (error) {
        console.error('Error al eliminar el grupo:', error);
      }
    } else {
      console.error("Si us plau, introdueix la paraula 'esborrar' per a confirmar l'eliminació.");
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
          placeholder="Escriu 'esborrar' per a confirmar"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          className="grup-delete__confirmation"
        />
      )}
      <button onClick={handleButtonClick} className="grup-delete__button">
        {showConfirmation ? 'Eliminar definitivament' : 'Eliminar grup'}
      </button>
    </div>
  );
}

export default GrupDelete;
