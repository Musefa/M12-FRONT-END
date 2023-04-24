import React, { useState } from "react";

function UserForm({ onSubmit, initialUser }) {
    const [user, setUser] = useState(initialUser);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

    function handlePasswordChange(event) {
        setCurrentPassword(event.target.value);
    }

    function handleNewPasswordChange(event) {
        setNewPassword(event.target.value);
    }

    function handleNewPasswordConfirmationChange(event) {
        setNewPasswordConfirmation(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (newPassword !== newPasswordConfirmation) {
            alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
            return;
        }

        const updatedUser = { ...user, currentPassword, newPassword };
        onSubmit(updatedUser);
    }

    return (
        <form onSubmit={handleSubmit}>
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
                onChange={handlePasswordChange}
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

            <button type="submit">Actualizar</button>
        </form>
    );
}

export default UserForm;
