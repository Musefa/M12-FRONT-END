import React, { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";

function ActaForm({
  onSubmit,
  initialActa = {
    estat: "",
    descripcions: [""],
    convocatoria: "",
    acords: [""],
    creador: null
  },
  convocatoriaList = [],
  acordList = [],
}) {
  const { userId } = useUserContext();
  const [acta, setActa] = useState(initialActa);

  const [selectedAcordIds, setSelectedAcordIds] = useState(initialActa.acords.map(acord => acord._id));

  function handleChange(e) {
    const { name, value } = e.target;
    setActa((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleChangeDescripcions(e, index) {
    const newDescripcions = [...acta.descripcions];
    newDescripcions[index] = e.target.value;
    setActa({ ...acta, descripcions: newDescripcions });
  }

  function handleAddDescripcions() {
    setActa({ ...acta, descripcions: [...acta.descripcions, ""] });
  }

  function handleRemoveDescripcions(index) {
    setActa({
      ...acta,
      descripcions: acta.descripcions.filter((_, i) => i !== index),
    });
  }


  function handleChangeAcordsSelect(e) {
    const newSelectedAcordIds = Array.from(e.target.selectedOptions, option => option.value);

    setSelectedAcordIds(newSelectedAcordIds);

    const updatedAcords = newSelectedAcordIds.map(id => acordList.find(acord => acord._id === id));
    setActa({ ...acta, acords: updatedAcords });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ ...acta, creador: userId });
  }

  return (
    <form onSubmit={handleSubmit} className="acta-form-container">
      <label>
        Nom:
        <input
          type="text"
          name="nom"
          value={acta.nom}
          onChange={handleChange}
          required
          className="acta-form__input"
        />
      </label>
      <label>
        Estado:
        <div>
          <label>
            Oberta:
            <input
              type="radio"
              name="estat"
              value="Oberta"
              checked={acta.estat === "Oberta"}
              onChange={handleChange}
              required
            />
          </label>
          Tancada
          <label>
            <input
              type="radio"
              name="estat"
              value="Tancada"
              checked={acta.estat === "Tancada"}
              onChange={handleChange}
              required
            />
          </label>
        </div>
      </label>
      <label>
        <h3 className="acta-form__subtitle">Descripciones</h3>
        {acta.descripcions.map((desc, index) => (
          <div key={index}>
            <input
              type="text"
              value={desc}
              onChange={(e) => handleChangeDescripcions(e, index)}
              required
              className="acta-form__input"
            />
            <button
              type="button"
              onClick={() => handleRemoveDescripcions(index)}
              className="acta-form__button acta-delete__button"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDescripcions}
          className="acta-form__button"
        >
          Añadir descripción
        </button>
      </label>
      <label>
        Convocatoria:
        <select
          name="convocatoria"
          value={acta.convocatoria}
          onChange={handleChange}
          required
          className="acta-form__input"
        >
          <option value="">Selecciona una convocatoria</option>
          {convocatoriaList.map((convocatoria) => (
            <option
              key={convocatoria._id}
              value={convocatoria._id}
              selected={acta.convocatoria === convocatoria._id}
            >
              {convocatoria.lloc}
            </option>
          ))}
        </select>
      </label>

      <label>
        Acuerdos:
        <select
          multiple
          value={selectedAcordIds}
          onChange={handleChangeAcordsSelect}
          className="acta-form__input"
        >
          {acordList.map(acord => (
            <option key={acord._id} value={acord._id}>
              {acord.nom}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="acta-form__submit-button">
        Guardar
      </button>
    </form>
  );
}

export default ActaForm;