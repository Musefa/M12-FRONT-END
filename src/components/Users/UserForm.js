import React, { useState } from "react";

function UserInfoForm({ onSubmit, initialUser }) {
  const [user, setUser] = useState(initialUser);
  const [currentPassword, setCurrentPassword] = useState("");

  function handleCurrentPasswordChange(event) {
    setCurrentPassword(event.target.value);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!currentPassword) {
      alert("Por favor, introduce tu contraseña actual.");
      return;
    }
    onSubmit({ ...user, currentPassword });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Actualizar información de usuario</h3>
      <label>Nombre:</label>
      <input
        type="text"
        name="nom"
        value={user.nom}
        onChange={handleChange}
      />

      <label>Apellido:</label>
      <input
        type="text"
        name="cognom"
        value={user.cognom}
        onChange={handleChange}
      />

      <label>DNI:</label>
      <input
        type="text"
        name="dni"
        value={user.dni || ""}
        onChange={handleChange}
      />

      <label>Especialidad:</label>
      <input
        type="text"
        name="especialitat"
        value={user.especialitat || ""}
        onChange={handleChange}
      />

      <label>Contraseña actual:</label>
      <input
        type="password"
        name="currentPassword"
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
      />

      <button type="submit">Actualizar información</button>
    </form>
  );
}

export default UserInfoForm;
