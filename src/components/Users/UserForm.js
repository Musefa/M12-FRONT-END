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
      console.error("Si us plau, afegeix la contrasenya actual");
      return;
    }
    onSubmit({ ...user, currentPassword });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Actualitzar informació de l'usuari</h3>
      <label className="useredit-form__label">Nom:</label>
      <input
        className="useredit-form__input"
        type="text"
        name="nom"
        value={user.nom}
        onChange={handleChange}
      />

      <label className="useredit-form__label">Cognoms:</label>
      <input
        className="useredit-form__input"
        type="text"
        name="cognom"
        value={user.cognom}
        onChange={handleChange}
      />

      <label className="useredit-form__label">DNI:</label>
      <input
        className="useredit-form__input"
        type="text"
        name="dni"
        value={user.dni || ""}
        onChange={handleChange}
      />

      <label className="useredit-form__label">Especialitat:</label>
      <input
        className="useredit-form__input"
        type="text"
        name="especialitat"
        value={user.especialitat || ""}
        onChange={handleChange}
      />

      <label className="useredit-form__label">Contrasenya actual:</label>
      <input
        className="useredit-form__input"
        type="password"
        name="currentPassword"
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
      />

      <button className="useredit-form__button" type="submit">Actualitzar informació</button>
    </form>
  );
}

export default UserInfoForm;
