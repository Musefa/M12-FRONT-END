import React, { useState } from "react";

function ConvocatoriaForm({
    onSubmit,
    initialConvocatoria = {
      data: "",
      horaInici: "",
      durada: "",
      lloc: "",
      puntsOrdreDia: [""],
      convocats: [],
      responsable: "",
    },
    usersList = [],
    grupsList = [],
    plantillasList = []
  }) {
    const [convocatoria, setConvocatoria] = useState(initialConvocatoria);

  function handleChange(e) {
    const { name, value } = e.target;
    setConvocatoria({ ...convocatoria, [name]: value });
  }

  function handleChangePuntsOrdreDia(e, index) {
    const newPuntsOrdreDia = [...convocatoria.puntsOrdreDia];
    newPuntsOrdreDia[index] = e.target.value;
    setConvocatoria({ ...convocatoria, puntsOrdreDia: newPuntsOrdreDia });
  }

  function handleAddPuntOrdreDia() {
    setConvocatoria({ ...convocatoria, puntsOrdreDia: [...convocatoria.puntsOrdreDia, ""] });
  }

  function handleRemovePuntOrdreDia(index) {
    setConvocatoria({
      ...convocatoria,
      puntsOrdreDia: convocatoria.puntsOrdreDia.filter((_, i) => i !== index),
    });
  }

  function handleChangeConvocats(e) {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setConvocatoria({ ...convocatoria, convocats: selectedOptions });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(convocatoria);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Fecha:
        <input type="date" name="data" value={convocatoria.data} onChange={handleChange} required />
      </label>
      <label>
        Hora de inicio:
        <input type="time" name="horaInici" value={convocatoria.horaInici} onChange={handleChange} required />
      </label>
      <label>
        Duración:
        <input type="number" name="durada" value={convocatoria.durada} onChange={handleChange} required />
      </label>
      <label>
        Lugar:
        <input type="text" name="lloc" value={convocatoria.lloc} onChange={handleChange} required />
      </label>
      <label>
        <h3>Puntos del orden del día</h3>
      {convocatoria.puntsOrdreDia.map((punt, index) => (
        <div key={index}>
          <input
            type="text"
            value={punt}
            onChange={(e) => handleChangePuntsOrdreDia(e, index)}
            required
          />
          <button type="button" onClick={() => handleRemovePuntOrdreDia(index)}>
            Eliminar
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddPuntOrdreDia}>
        Añadir punto del orden del día
      </button>
      </label>
      <label>
        Grupos convocados:
        <select multiple name="convocats" value={convocatoria.convocats} onChange={handleChangeConvocats} required>
          {grupsList.map((grup) => (
            <option key={grup._id} value={grup._id}>{grup.nom}</option>
          ))}
        </select>
      </label>
      <label>
        Plantilla:
        <select name="plantilla" value={convocatoria.plantilla}    onChange={handleChange} required>
      <option value="">Selecciona una plantilla</option>
      {plantillasList.map((plantilla) => (
        <option key={plantilla._id} value={plantilla._id}>
          {plantilla.nom}
        </option>
      ))}
    </select>
  </label>
  <label>
    Responsable:
    <select name="responsable" value={convocatoria.responsable} onChange={handleChange} required>
      <option value="">Selecciona un responsable</option>
      {usersList.map((user) => (
        <option key={user._id} value={user._id}>
          {user.nom}
        </option>
      ))}
    </select>
  </label>
  <button type="submit">Guardar</button>
</form>
);
}

export default ConvocatoriaForm;
