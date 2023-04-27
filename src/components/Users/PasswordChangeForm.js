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
      <label className="useredit-form__label">Contrasenya actual:</label>
      <input
        type="password"
        name="currentPassword"
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
        className="useredit-form__input"
      />

      <label className="useredit-form__label">Nova contrasenya:</label>
      <input
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={handleNewPasswordChange}
        className="useredit-form__input"
      />

      <label className="useredit-form__label">Confirmar nova contrasenya:</label>
      <input
        type="password"
        name="newPasswordConfirmation"
        value={newPasswordConfirmation}
        onChange={handleNewPasswordConfirmationChange}
        className="useredit-form__input"
      />

      <button type="submit" className="useredit-form__button">Canviar contrasenya</button>
    </form>
  );
}

export default PasswordChangeForm;
