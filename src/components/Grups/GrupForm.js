import React, { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";

function GrupForm({ onSubmit, initialGrup = { nom: "", membres: [], tipus: "", creador: null }, usersList = [] }) {
  const [grup, setGrup] = useState(initialGrup);
  const [selectedMemberIds, setSelectedMemberIds] = useState(initialGrup.membres.map(membre => membre._id));

  const { userId } = useUserContext(); // Obtener userId desde el UserContext

  function handleChangeNom(e) {
    setGrup({ ...grup, nom: e.target.value });
  }

  function handleChangeTipus(e) {
    setGrup({ ...grup, tipus: e.target.value });
  }

  //Esta funcion solo funciona para la estructura antigua de seleccion de miembros con el select
  /*
  function handleChangeMembres(e) {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedMemberIds(selectedOptions);
    const updatedMembres = selectedOptions.map(id => usersList.find(user => user._id === id));
    setGrup({ ...grup, membres: updatedMembres });
  }
  */

  //Para poder seleccionar los miembros usando checkboxes
  function handleChangeMembresCheckboxes(e) {
    const memberId = e.target.value;
    const isChecked = e.target.checked;

    /*
    const newSelectedMemberIds = isChecked
      ? [...selectedMemberIds, memberId]
      : selectedMemberIds.filter(id => id !== memberId);
*/
    var newSelectedMemberIds;
    if (isChecked) {
      newSelectedMemberIds = [...selectedMemberIds, memberId];
    } else {
      newSelectedMemberIds = selectedMemberIds.filter(id => id !== memberId);
    }

    setSelectedMemberIds(newSelectedMemberIds);

    const updatedMembres = newSelectedMemberIds.map(id => usersList.find(user => user._id === id));
    setGrup({ ...grup, membres: updatedMembres });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ ...grup, creador: userId }); // Actualiza la propiedad creador antes de enviar
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="plantilla-form__label">
        Nombre:
        <input type="text" value={grup.nom} onChange={handleChangeNom} className="plantilla-form__input" required />
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

      <div className="plantilla-form__checkbox" style={{ maxHeight: "200px", overflowY: "auto" }}>
        {usersList.map(user => (
          <div key={user._id}>
            <input
              type="checkbox"
              value={user._id}
              checked={selectedMemberIds.includes(user._id)}
              onChange={handleChangeMembresCheckboxes}
              id={`member-${user._id}`}
            />
            <label htmlFor={`member-${user._id}`} style={{ marginLeft: "10px" }}>{user.nom + " " + user.cognom}</label>
          </div>
        ))}
      </div>

      {/*
      Estructura antigua para seleccionar miembros con selects
        <label className="plantilla-form__label">
        Seleccionar miembros:
        <select multiple value={selectedMemberIds} onChange={handleChangeMembres} className="plantilla-form__input" required>
          {usersList.map(user => (
            <option key={user._id} value={user._id}>
              {user.nom}
            </option>
          ))}
        </select>
      </label>
      */}

      <button type="submit" className="plantilla-form__button">Guardar</button>
    </form>
  );
}

export default GrupForm;
