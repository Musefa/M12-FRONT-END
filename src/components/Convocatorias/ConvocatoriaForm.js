import React, { useState } from "react";

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
    responsable: ""
  },
  usersList = [],
  grupsList = [],
  plantillasList = [],
}) {
  const [convocatoria, setConvocatoria] = useState({
    ...initialConvocatoria,
    data: initialConvocatoria.data ? formatDate(initialConvocatoria.data) : "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setConvocatoria((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleChangePuntsOrdreDia(e, index) {
    const newPuntsOrdreDia = [...convocatoria.puntsOrdreDia];
    newPuntsOrdreDia[index] = e.target.value;
    setConvocatoria({ ...convocatoria, puntsOrdreDia: newPuntsOrdreDia });
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

  function handleChangeConvocats(e) {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setConvocatoria({ ...convocatoria, convocats: selectedOptions });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(convocatoria);
  }

  return (
    <form onSubmit={handleSubmit} className="plantilla-form-container">
      <label>
        Nom:
        <input
          type="text"
          name="nom"
          value={convocatoria.nom}
          onChange={handleChange}
          required
          className="plantilla-form__input"
        />
      </label>
      <label>
        Fecha:
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
        Hora de inicio:
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
        Duración:
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
        Lugar:
        <input
          type="text"
          name="lloc"
          value={convocatoria.lloc}
          onChange={handleChange}
          required
          className="plantilla-form__input"
        />
      </label>
      <label>
        <h3 className="plantilla-form__subtitle">Puntos del orden del día</h3>
        {convocatoria.puntsOrdreDia.map((punt, index) => (
          <div key={index}>
            <input
              type="text"
              value={punt}
              onChange={(e) => handleChangePuntsOrdreDia(e, index)}
              required
              className="plantilla-form__input"
            />
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
          Añadir punto del orden del día
        </button>
      </label>
      <label>
        Grupos convocados:
        <select
          multiple
          name="convocats"
          value={convocatoria.convocats}
          onChange={handleChangeConvocats}
          required
          className="plantilla-form__input"
        >
          {grupsList.map((grup) => (
            <option
              key={grup._id}
              value={grup._id}
              selected={convocatoria.convocats.includes(grup._id)}
              className="plantilla-form__item"
            >
              {grup.nom}
            </option>
          ))}
        </select>
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
      <button type="submit" className="plantilla-form__button">
        Guardar
      </button>
    </form>
  );
}

export default ConvocatoriaForm;
