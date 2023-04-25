import React, { useState } from "react";

function PlantillaForm({ onSubmit, initialPlantilla = { nom: "", puntsOrdreDia: [""] }, userId }) {
  const [plantilla, setPlantilla] = useState(initialPlantilla);
  const [errors, setErrors] = useState({ nom: "", puntsOrdreDia: [] });

  function validateNom(value) {
    return value.length >= 3 ? "" : "El nom ha de tenir almenys 3 lletres";
  }

  function validatePuntsOrdreDia(value) {
    return value.length >= 4 ? "" : "El punt del dia ha de tenir almenys 4 lletres";
  }

  function handleChangeNom(e) {
    const value = e.target.value;
    setPlantilla({ ...plantilla, nom: value });
    setErrors({ ...errors, nom: validateNom(value) });
  }

  function handleChangePuntsOrdreDia(e, index) {
    const value = e.target.value;
    const newPuntsOrdreDia = [...plantilla.puntsOrdreDia];
    const newErrorsPuntsOrdreDia = [...errors.puntsOrdreDia];

    newPuntsOrdreDia[index] = value;
    if (typeof newErrorsPuntsOrdreDia[index] === "undefined") {
      newErrorsPuntsOrdreDia.push(validatePuntsOrdreDia(value));
    } else {
      newErrorsPuntsOrdreDia[index] = validatePuntsOrdreDia(value);
    }

    setPlantilla({ ...plantilla, puntsOrdreDia: newPuntsOrdreDia });
    setErrors({ ...errors, puntsOrdreDia: newErrorsPuntsOrdreDia });
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

  function hasErrors() {
    if (errors.nom || !plantilla.nom) return true;
    for (let i = 0; i < plantilla.puntsOrdreDia.length; i++) {
      if (errors.puntsOrdreDia[i] || !plantilla.puntsOrdreDia[i]) return true;
    }
    return false;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="plantilla-form__label">
        Nom:
        <input type="text" value={plantilla.nom} onChange={handleChangeNom} className="plantilla-form__input" required />
        {errors.nom && <p className="error">{errors.nom}</p>}
      </label>
      <input type="hidden" name="creador" value={userId} />
      <label className="plantilla-form__label">
      Punts del dia:
      {plantilla.puntsOrdreDia.map((punt, index) => (
        <div key={index}>
          <input
            type="text"
            value={punt}
            onChange={(e) => handleChangePuntsOrdreDia(e, index)}
            className="plantilla-form__input"
          />
          {errors.puntsOrdreDia[index] && <p className="error">{errors.puntsOrdreDia[index]}</p>}
          <button type="button" onClick={() => handleRemovePuntOrdreDia(index)} className="plantilla-form__button">
            Eliminar
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddPuntOrdreDia} className="plantilla-form__button">
        Afegir punt del dia
      </button>
      </label>
      <button type="submit" className="plantilla-form__button" disabled={hasErrors()}>Guardar</button>
    </form>
  );
}

export default PlantillaForm;
