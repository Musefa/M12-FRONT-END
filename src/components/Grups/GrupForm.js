import React, { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import ReactSelect from "react-select";

function GrupForm({ onSubmit, initialGrup = { nom: "", membres: [], tipus: "", creador: null }, usersList = [] }) {
  const [grup, setGrup] = useState(initialGrup);
  const [selectedMembers, setSelectedMembers] = useState(initialGrup.membres);

  const { userId, userRole } = useUserContext(); // Obtener userId desde el UserContext

  const options = usersList.map(user => ({
    value: user._id,
    label: user.nom
  }));

  const handleChangeNom = e => {
    setGrup({ ...grup, nom: e.target.value });
  };

  const handleChangeTipus = e => {
    setGrup({ ...grup, tipus: e.target.value });
  };

  const handleChangeMembers = selectedOptions => {
    const updatedMembers = selectedOptions.map(option => ({
      _id: option.value,
      nom: option.label
    }));
    setSelectedMembers(updatedMembers);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...grup, membres: selectedMembers, creador: userId }); // Actualiza la propiedad creador y membres antes de enviar
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="plantilla-form__label">
        Nombre:
        <input
          type="text"
          value={grup.nom}
          onChange={handleChangeNom}
          className="plantilla-form__input"
          required
        />
      </label>
      <label>
        Tipus:
        <div>
          <label>
            Públic:
            <input
              type="radio"
              name="tipus"
              value="Públic"
              checked={grup.tipus === "Públic"}
              onChange={handleChangeTipus}
              disabled={userRole !== "administrador" && userRole !== "directiu"}
              required
            />
          </label>
          Privat:
          <label>
            <input
              type="radio"
              name="tipus"
              value="Privat"
              checked={grup.tipus === "Privat"}
              onChange={handleChangeTipus}
              required
            />
          </label>
        </div>
      </label>
      <h3 className="plantilla-form__subtitle">Miembros</h3>
      <label className="plantilla-form__label">
        Seleccionar miembros:
        <ReactSelect
          isMulti
          options={options}
          value={selectedMembers.map(member => ({ value: member._id, label: member.nom }))}
          onChange={handleChangeMembers}
          className="plantilla-form__input"
          required
        />
      </label>
      <button type="submit" className="plantilla-form__button">
        Guardar
      </button>
    </form>
  );
}

export default GrupForm;