import React, { useState } from "react";

function PasswordChangeForm({ onSubmit }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  function handleCurrentPasswordChange(event) {
    setCurrentPassword(event.target.value);
  }

  function handleNewPasswordChange(event) {
    setNewPassword(event.target.value);
  }

  function handleNewPasswordConfirmationChange(event) {
    setNewPasswordConfirmation(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (newPassword !== newPasswordConfirmation) {
      alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
      return;
    }

    onSubmit({ currentPassword, newPassword });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cambiar contraseña</h3>
      <label>Contraseña actual:</label>
      <input
        type="password"
        name="currentPassword"
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
      />

      <label>Nueva contraseña:</label>
      <input
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={handleNewPasswordChange}
      />

      <label>Confirmar nueva contraseña:</label>
      <input
        type="password"
        name="newPasswordConfirmation"
        value={newPasswordConfirmation}
        onChange={handleNewPasswordConfirmationChange}
      />

      <button type="submit">Cambiar contraseña</button>
    </form>
  );
}

export default PasswordChangeForm;
