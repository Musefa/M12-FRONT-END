import React, { useState } from "react";

function PlantillaForm({ onSubmit, initialPlantilla = { nom: "", puntsOrdreDia: [""] }, userId }) {
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
    onSubmit({ ...plantilla, creador: userId });
  }  

  return (
    <form onSubmit={handleSubmit}>
      <label className="plantilla-form__label">
        Nombre:
        <input type="text" value={plantilla.nom} onChange={handleChangeNom} className="plantilla-form__input" required />
      </label>
      <input type="hidden" name="creador" value={userId} />
      <h3 className="plantilla-form__subtitle">Puntos del orden del día</h3>
      {plantilla.puntsOrdreDia.map((punt, index) => (
        <div key={index}>
          <input
            type="text"
            value={punt}
            onChange={(e) => handleChangePuntsOrdreDia(e, index)}
            className="plantilla-form__input"
            required
          />
          <button type="button" onClick={() => handleRemovePuntOrdreDia(index)} className="plantilla-form__button">
            Eliminar
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddPuntOrdreDia} className="plantilla-form__button">
        Añadir punto del orden del día
      </button>
      <button type="submit" className="plantilla-form__button">Guardar</button>
    </form>
  );
}

export default PlantillaForm;