import React, { useState } from "react";

function GrupForm({ onSubmit, initialGrup = { nom: "", membres: [] }, usersList = [] }) {
  const [grup, setGrup] = useState(initialGrup);

  function handleChangeNom(e) {
    setGrup({ ...grup, nom: e.target.value });
  }

  function handleChangeMembres(e) {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setGrup({ ...grup, membres: selectedOptions });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(grup);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="plantilla-form__label">
        Nombre:
        <input type="text" value={grup.nom} onChange={handleChangeNom} className="plantilla-form__input" required />
      </label>
      <h3 className="plantilla-form__subtitle">Miembros</h3>
      <label className="plantilla-form__label">
        Seleccionar miembros:
        <select multiple value={grup.membres} onChange={handleChangeMembres} className="plantilla-form__input" required>
          {usersList.map(user => (
            <option key={user._id} value={user._id}>{user.nom}</option>
          ))}
        </select>
      </label>
      <button type="submit" className="plantilla-form__button">Guardar</button>
    </form>
  );
}

export default GrupForm;
