import React, { useState } from "react";
import { deleteConvocatoria } from "../../services/ConvocatoriaController";
import { useNavigate } from "react-router-dom";

function ConvocatoriaDelete({ convocatoriaId, onUpdate, className }) {
  const [confirmation, setConfirmation] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  async function handleDelete() {
    if (confirmation === "borrar") {
      try {
        await deleteConvocatoria(convocatoriaId);
        alert("Convocatoria eliminada correctamente.");
        onUpdate();
        navigate("/convocatorias");
      } catch (error) {
        console.error("Error al eliminar la convocatoria:", error);
        alert("Error al eliminar la convocatoria.");
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
          : "Eliminar convocatoria"}
      </button>
    </div>
  );
}

export default ConvocatoriaDelete;
