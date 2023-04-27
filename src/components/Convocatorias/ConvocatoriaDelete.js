import React, { useState } from "react";
import { deleteConvocatoria } from "../../services/ConvocatoriaController";
import { useNavigate } from "react-router-dom";

function ConvocatoriaDelete({ convocatoriaId, onUpdate, className }) {
  const [confirmation, setConfirmation] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  async function handleDelete() {
    if (confirmation === "esborrar") {
      try {
        await deleteConvocatoria(convocatoriaId);
        onUpdate();
        navigate("/convocatorias");
      } catch (error) {
        console.error("Error al eliminar la convocatòria:", error);
      }
    } else {
      console.error(
        "Si us plau, introdueix la paraula 'esborrar' per a confirmar l'eliminació."
      );
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
    <div className={className}>
      {showConfirmation && (
        <input
          type="text"
          placeholder="Escriu 'esborrar' per a confirmar"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          className={`${className}__confirmation`}
        />
      )}
      <button onClick={handleButtonClick} className={`${className}__button`}>
        {showConfirmation
          ? "Eliminar definitivament"
          : "Eliminar convocatòria"}
      </button>
    </div>
  );
}

export default ConvocatoriaDelete;
