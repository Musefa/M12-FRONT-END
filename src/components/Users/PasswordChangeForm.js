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
      console.error("Les contrasenyes no coincideixen. Si us plau, intenta-ho de nou.");
      return;
    }

    onSubmit({ currentPassword, newPassword });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Canviar contrasenya</h3>
      <label>Contrasenya actual:</label>
      <input
        type="password"
        name="currentPassword"
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
      />

      <label>Nova contrasenya:</label>
      <input
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={handleNewPasswordChange}
      />

      <label>Confirmar nova contrasenya:</label>
      <input
        type="password"
        name="newPasswordConfirmation"
        value={newPasswordConfirmation}
        onChange={handleNewPasswordConfirmationChange}
      />

      <button type="submit">Canviar contrasenya</button>
    </form>
  );
}

export default PasswordChangeForm;
