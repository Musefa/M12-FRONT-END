import React, { useState } from "react";
import { deleteAcord } from "../../services/AcordController";
import { useNavigate } from "react-router-dom";

function AcordDelete({ acordId, onUpdate, className }) {
  const [confirmation, setConfirmation] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  async function handleDelete() {
    if (confirmation === "esborrar") {
      try {
        await deleteAcord(acordId);
        onUpdate();
        navigate("/acords");
      } catch (error) {
        console.error("Error al eliminar l'acord:", error);
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
          : "Eliminar acord"}
      </button>
    </div>
  );
}

export default AcordDelete;
