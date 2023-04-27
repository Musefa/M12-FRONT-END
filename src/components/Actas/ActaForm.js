import React, { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import ReactSelect from "react-select";

function ActaForm({
  onSubmit,
  initialActa = {
    estat: "",
    descripcions: [""],
    convocatoria: "",
    acords: [],
    creador: null,
    assistents: [],
  },
  convocatoriaList = [],
  acordList = [],
}) {
  const { userId } = useUserContext();
  const [acta, setActa] = useState(initialActa);
  const [errors, setErrors] = useState({ nom: "", descripcions: [] });

  function validateNom(value) {
    return value.length >= 3 ? "" : "El nom ha de tenir com a mínim 3 lletres";
  }

  function validateDescripcions(value) {
    return value.length >= 10 ? "" : "La descripció ha de tenir com a mínim 10 lletres";
  }

  const [selectedAcordIds, setSelectedAcordIds] = useState(initialActa.acords.map(acord => acord._id));
  console.log(selectedAcordIds);

  const isUpdateMode = initialActa._id !== undefined;

  function handleChange(e) {
    const { name, value } = e.target;
    setActa((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleChangeNom(e) {
    const value = e.target.value;
    setActa({ ...acta, nom: value });
    setErrors({ ...errors, nom: validateNom(value) });
  }

  function handleChangeAssistentsSelect(selectedOptions) {
    const updatedAssistents = selectedOptions.map(option => {
      const user = acta.convocatoria.convocats
        .flatMap(grup => grup.membres)
        .find(user => user._id === option.value);
      return user;
    });
    setActa({ ...acta, assistents: updatedAssistents });
  }

  function handleChangeDescripcions(e, index) {
    const value = e.target.value;
    const newDescripcions = [...acta.descripcions];
    const newErrorsDescripcions = [...errors.descripcions];

    newDescripcions[index] = value;
    if (typeof newErrorsDescripcions[index] === "undefined") {
      newErrorsDescripcions.push(validateDescripcions(value));
    } else {
      newErrorsDescripcions[index] = validateDescripcions(value);
    }

    setActa({ ...acta, descripcions: newDescripcions });
    setErrors({ ...errors, descripcions: newErrorsDescripcions });
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


  function handleChangeAcordsSelect(selectedOptions) {
    const newSelectedAcordIds = selectedOptions.map(option => option.value);
    setSelectedAcordIds(newSelectedAcordIds);

    const updatedAcords = newSelectedAcordIds.map(id => acordList.find(acord => acord._id === id));
    setActa({ ...acta, acords: updatedAcords });
  }

  function handleChangeConvocatoria(e) {
    const selectedConvocatoriaId = e.target.value;
    const updatedConvocatoria = convocatoriaList.find(convocatoria => convocatoria._id === selectedConvocatoriaId);
    setActa({ ...acta, convocatoria: updatedConvocatoria });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ ...acta, creador: userId });
  }

  function hasErrors() {
    if (errors.nom || !acta.nom) return true;
    for (let i = 0; i < acta.descripcions.length; i++) {
      if (errors.descripcions[i] || !acta.descripcions[i]) return true;
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
          value={acta.nom}
          onChange={handleChangeNom}
          required
          className="acta-form__input"
        />
        {errors.nom && <p className="error">{errors.nom}</p>}
      </label>
      <label>
        Estat:
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
          {isUpdateMode && (
            <>
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
            </>
          )}
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
            {errors.descripcions[index] && <p className="error">{errors.descripcions[index]}</p>}
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
          Afegir descripció
        </button>
      </label>
      <label>
        Convocatoria:
        <select
          name="convocatoria"
          value={acta.convocatoria._id || ""}
          onChange={handleChangeConvocatoria}
          required
          className="acta-form__input"
        >
          <option value="">Selecciona una convocatòria</option>
          {convocatoriaList.map((convocatoria) => (
            <option
              key={convocatoria._id}
              value={convocatoria._id}
            >
              {convocatoria.nom}
            </option>
          ))}
        </select>
      </label>
      <label>
        Acords:
        <ReactSelect
          isMulti
          value={acta.acords.map(acord => ({ label: acord.nom, value: acord._id }))}
          options={acordList.map(acord => ({ label: acord.nom, value: acord._id }))}
          onChange={handleChangeAcordsSelect}
          className="acta-form__input"
        />
      </label>
      {isUpdateMode && (
        <label>
          Assistents:
          <ReactSelect
            isMulti
            value={acta.assistents.map(assistent => ({
              label: assistent.nom,
              value: assistent._id,
            }))}
            options={
              acta.convocatoria
                ? acta.convocatoria.convocats.flatMap(grup =>
                  grup.membres.map(user => ({
                    label: user.nom,
                    value: user._id,
                  }))
                )
                : []
            }
            onChange={handleChangeAssistentsSelect}
            className="acta-form__input"
          />
        </label>
      )}
      <button type="submit" className="acta-form__button" disabled={hasErrors()}>
        Guardar
      </button>
    </form>
  );
}

export default ActaForm;