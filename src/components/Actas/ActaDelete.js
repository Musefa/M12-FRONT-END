import React, { useState } from "react";
import { deleteActa } from "../../services/ActaController";
import { useNavigate } from "react-router-dom";

function ActaDelete({ actaId, onUpdate, className }) {
  const [confirmation, setConfirmation] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  async function handleDelete() {
    if (confirmation === "borrar") {
      try {
        await deleteActa(actaId);
        alert("Acta eliminada correctamente.");
        onUpdate();
        navigate("/actas");
      } catch (error) {
        console.error("Error al eliminar el acta:", error);
        alert("Error al eliminar el acta.");
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
          : "Eliminar acta"}
      </button>
    </div>
  );
}

export default ActaDelete;
