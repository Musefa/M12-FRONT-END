import React, { useState } from "react";
import { deleteAcord } from "../../services/AcordController";
import { useNavigate } from "react-router-dom";

function AcordDelete({ acordId, onUpdate, className }) {
  const [confirmation, setConfirmation] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  async function handleDelete() {
    if (confirmation === "borrar") {
      try {
        await deleteAcord(acordId);
        alert("Acord eliminadaocorrectamente.");
        onUpdate();
        navigate("/acords");
      } catch (error) {
        console.error("Error al eliminar el acuerdo:", error);
        alert("Error al eliminar el acuerdo.");
      }
    } else {
      alert(
        'Por favor, introduce la palabra "borrar" para confirmar la eliminación.'
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
          placeholder="Escribe 'borrar' para confirmar"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          className={`${className}__confirmation`}
        />
      )}
      <button onClick={handleButtonClick} className={`${className}__button`}>
        {showConfirmation
          ? "Eliminar definitivamente"
          : "Eliminar acuerdo"}
      </button>
    </div>
  );
}

export default AcordDelete;
