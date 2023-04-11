import React, { useState } from "react";

function PlantillaForm({ onSubmit, initialPlantilla = { nom: "", puntsOrdreDia: [""] } }) {
  const [plantilla, setPlantilla] = useState(initialPlantilla);

  function handleChangeNom(e) {
    setPlantilla({ ...plantilla, nom: e.target.value });
  }

  function handleChangePuntsOrdreDia(e, index) {
    const newPuntsOrdreDia = [...plantilla.puntsOrdreDia];
    newPuntsOrdreDia[index] = e.target.value;
    setPlantilla({ ...plantilla, puntsOrdreDia: newPuntsOrdreDia });
  }

  function handleAddPuntOrdreDia() {
    setPlantilla({ ...plantilla, puntsOrdreDia: [...plantilla.puntsOrdreDia, ""] });
  }

  function handleRemovePuntOrdreDia(index) {
    setPlantilla({
      ...plantilla,
      puntsOrdreDia: plantilla.puntsOrdreDia.filter((_, i) => i !== index),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(plantilla);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={plantilla.nom} onChange={handleChangeNom} required />
      </label>
      <h3>Puntos del orden del día</h3>
      {plantilla.puntsOrdreDia.map((punt, index) => (
        <div key={index}>
          <input
            type="text"
            value={punt}
            onChange={(e) => handleChangePuntsOrdreDia(e, index)}
            required
          />
          <button type="button" onClick={() => handleRemovePuntOrdreDia(index)}>
            Eliminar
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddPuntOrdreDia}>
        Añadir punto del orden del día
      </button>
      <button type="submit">Guardar</button>
    </form>
  );
}

export default PlantillaForm;