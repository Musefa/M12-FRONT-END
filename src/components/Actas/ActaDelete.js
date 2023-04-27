import React, { useState } from "react";
import { deleteActa } from "../../services/ActaController";
import { useNavigate } from "react-router-dom";

function ActaDelete({ actaId, onUpdate, className }) {
  const [confirmation, setConfirmation] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  async function handleDelete() {
    if (confirmation === "esborrar") {
      try {
        await deleteActa(actaId);
        onUpdate();
        navigate("/actas");
      } catch (error) {
        console.error("Error al eliminar l'acta:", error);
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
          : "Eliminar acta"}
      </button>
    </div>
  );
}

export default ActaDelete;
