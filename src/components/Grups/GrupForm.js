import React, { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import ReactSelect from "react-select";

function GrupForm({ onSubmit, initialGrup = { nom: "", membres: [], tipus: "", creador: null }, usersList = [] }) {
  const [grup, setGrup] = useState(initialGrup);
  const [selectedMembers, setSelectedMembers] = useState(initialGrup.membres);
  const [errors, setErrors] = useState({ nom: "" });

  function validateNom(value) {
    return value.length >= 3 ? "" : "El nom ha de tenir almenys 3 lletres";
  }

  const { userId, userRole } = useUserContext();

  const options = usersList.map(user => ({
    value: user._id,
    label: user.nom
  }));

  const handleChangeNom = e => {
    const value = e.target.value;
    setGrup({ ...grup, nom: e.target.value });
    setErrors({ ...errors, nom: validateNom(value) });
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
    onSubmit({ ...grup, membres: selectedMembers, creador: userId });
  };

  function hasErrors() {
    if (errors.nom || !grup.nom) return true;
    return false;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="grup-form__label">
        Nom:
        <input
          type="text"
          value={grup.nom}
          onChange={handleChangeNom}
          className="grup-form__input"
          required
        />
        {errors.nom && <p className="error">{errors.nom}</p>}
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
      <h3 className="grup-form__subtitle">Miembros</h3>
      <label className="grup-form__label">
        Seleccionar membres:
        <ReactSelect
          isMulti
          options={options}
          value={selectedMembers.map(member => ({ value: member._id, label: member.nom }))}
          onChange={handleChangeMembers}
          className="grup-form__input"
          required
        />
      </label>
      <button type="submit" className="grup-form__button" disabled={hasErrors()}>
        Guardar
      </button>
    </form>
  );
}

export default GrupForm;