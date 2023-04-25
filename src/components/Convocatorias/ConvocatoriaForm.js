import React, { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import Select from "react-select";

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

function ConvocatoriaForm({
  onSubmit,
  initialConvocatoria = {
    nom: "",
    data: "",
    horaInici: "",
    durada: "",
    lloc: "",
    puntsOrdreDia: [""],
    convocats: [],
    responsable: "",
    creador: null
  },
  usersList = [],
  grupsList = [],
  plantillasList = [],
}) {
  const { userId } = useUserContext();
  const [convocatoria, setConvocatoria] = useState({
    ...initialConvocatoria,
    data: initialConvocatoria.data ? formatDate(initialConvocatoria.data) : "",
  });
  const [errors, setErrors] = useState({ nom: "", lloc: "", puntsOrdreDia: [] });

  function validateNom(value) {
    return value.length >= 3 ? "" : "El nom ha de tenir com a mínim 3 lletres";
  }

  function validateLloc(value) {
    return value.length >= 3 ? "" : "El lloc ha de tenir com a mínim 3 lletres";
  }

  function validatePuntsOrdreDia(value) {
    return value.length >= 4 ? "" : "El punt ha de tenir com a mínim 4 lletres";
  }

  function handleChangeNom(e) {
    const value = e.target.value;
    setConvocatoria({ ...convocatoria, nom: value });
    setErrors({ ...errors, nom: validateNom(value) });
  }

  function handleChangeLloc(e) {
    const value = e.target.value;
    setConvocatoria({ ...convocatoria, lloc: value });
    setErrors({ ...errors, lloc: validateLloc(value) });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setConvocatoria((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleChangePuntsOrdreDia(e, index) {
    const value = e.target.value;
    const newPuntsOrdreDia = [...convocatoria.puntsOrdreDia];
    const newErrorsPuntsOrdreDia = [...errors.puntsOrdreDia];

    newPuntsOrdreDia[index] = value;
    if (typeof newErrorsPuntsOrdreDia[index] === "undefined") {
      newErrorsPuntsOrdreDia.push(validatePuntsOrdreDia(value));
    } else {
      newErrorsPuntsOrdreDia[index] = validatePuntsOrdreDia(value);
    }

    setConvocatoria({ ...convocatoria, puntsOrdreDia: newPuntsOrdreDia });
    setErrors({ ...errors, puntsOrdreDia: newErrorsPuntsOrdreDia });
  }

  function handleAddPuntOrdreDia() {
    setConvocatoria({
      ...convocatoria,
      puntsOrdreDia: [...convocatoria.puntsOrdreDia, ""],
    });
  }

  function handleRemovePuntOrdreDia(index) {
    setConvocatoria({
      ...convocatoria,
      puntsOrdreDia: convocatoria.puntsOrdreDia.filter((_, i) => i !== index),
    });
  }

  function handleChangeConvocats(selectedOptions) {
    const selectedValues = selectedOptions.map((option) => option.value);
    setConvocatoria((prevState) => ({
      ...prevState,
      convocats: selectedValues,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ ...convocatoria, creador: userId });
  }

  function hasErrors() {
    if (errors.nom || !convocatoria.nom || errors.lloc || !convocatoria.lloc) return true;
    for (let i = 0; i < convocatoria.puntsOrdreDia.length; i++) {
      if (errors.puntsOrdreDia[i] || !convocatoria.puntsOrdreDia[i]) return true;
    }
    return false;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom:
        <input
          type="text"
          name="nom"
          value={convocatoria.nom}
          onChange={handleChangeNom}
          required
          className="plantilla-form__input"
        />
        {errors.nom && <p className="error">{errors.nom}</p>}
      </label>
      <label>
        Data:
        <input
          type="date"
          name="data"
          value={convocatoria.data}
          onChange={handleChange}
          required
          className="plantilla-form__input"
        />
      </label>
      <label>
        Hora d'inici:
        <input
          type="time"
          name="horaInici"
          value={convocatoria.horaInici}
          onChange={handleChange}
          required
          className="plantilla-form__input"
        />
      </label>
      <label>
        Duració:
        <input
          type="number"
          name="durada"
          value={convocatoria.durada}
          onChange={handleChange}
          required
          className="plantilla-form__input"
        />
      </label>
      <label>
        Lloc:
        <input
          type="text"
          name="lloc"
          value={convocatoria.lloc}
          onChange={handleChangeLloc}
          required
          className="plantilla-form__input"
        />
        {errors.lloc && <p className="error">{errors.lloc}</p>}
      </label>
      <label>
        <h3 className="plantilla-form__subtitle">Punts del dia</h3>
        {convocatoria.puntsOrdreDia.map((punt, index) => (
          <div key={index}>
            <input
              type="text"
              value={punt}
              onChange={(e) => handleChangePuntsOrdreDia(e, index)}
              required
              className="plantilla-form__input"
            />
            {errors.puntsOrdreDia[index] && <p className="error">{errors.puntsOrdreDia[index]}</p>}
            <button
              type="button"
              onClick={() => handleRemovePuntOrdreDia(index)}
              className="plantilla-form__button plantilla-delete__button"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddPuntOrdreDia}
          className="plantilla-form__button"
        >
          Afegir punt d'ordre del día
        </button>
      </label>
      <label>
        Grups convocats:
        <Select
          isMulti
          name="convocats"
          options={grupsList.map(grup => ({ value: grup._id, label: grup.nom }))}
          value={convocatoria.convocats.map(convocat => {
            const grup = grupsList.find(grup => grup._id === convocat);
            return grup ? { value: convocat, label: grup.nom } : null;
          }).filter(convocat => convocat)}
          onChange={handleChangeConvocats}
          className="plantilla-form__input"
          required
        />
      </label>
      <label>
        Plantilla:
        <select
          name="plantilla"
          value={convocatoria.plantilla}
          onChange={handleChange}
          required
          className="plantilla-form__input"
        >
          <option value="">Selecciona una plantilla</option>
          {plantillasList.map((plantilla) => (
            <option
              key={plantilla._id}
              value={plantilla._id}
              selected={convocatoria.plantilla === plantilla._id}
            >
              {plantilla.nom}
            </option>
          ))}
        </select>
      </label>
      <label>
        Responsable:
        <select
          name="responsable"
          value={convocatoria.responsable}
          onChange={handleChange}
          required
          className="plantilla-form__input"
        >
          <option value="">Selecciona un responsable</option>
          {usersList.map((user) => (
            <option
              key={user._id}
              value={user._id}
              selected={convocatoria.responsable === user._id}
            >
              {user.nom}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="plantilla-form__button" disabled={hasErrors()}>
        Guardar
      </button>
    </form>
  );
}

export default ConvocatoriaForm;
