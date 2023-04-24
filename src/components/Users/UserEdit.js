import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateUser } from "../../services/UserController";
import { getUsersList } from "../../services/GrupController";
import UserInfoForm from "./UserForm";
import PasswordChangeForm from "./PasswordChangeForm";
import { useNavigate } from "react-router-dom";

function UserEdit() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const users = await getUsersList();
        const userFound = users.find((u) => u._id === id);
        if (userFound) {
          setUser(userFound);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUser();
  }, [id]);

  async function handleUserInfoSubmit(updatedUserInfo) {
    try {
      await updateUser(id, updatedUserInfo);
      alert("Información de usuario actualizada correctamente.");
      navigate("/");
    } catch (error) {
      console.error("Error updating user info:", error);
      alert("Error al actualizar la información del usuario.");
    }
  }  

  async function handlePasswordChangeSubmit(passwordInfo) {
    try {
      await updateUser(id, passwordInfo);
      alert("Contraseña actualizada correctamente.");
      navigate("/");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error al actualizar la contraseña.");
    }
  }

  return (
    <div className="user-form-container">
      <h2>Editar información de usuario</h2>
      {user ? (
        <>
          <UserInfoForm onSubmit={handleUserInfoSubmit} initialUser={user} />
          <PasswordChangeForm onSubmit={handlePasswordChangeSubmit} />
        </>
      ) : (
        <p>Cargando usuario...</p>
      )}
    </div>
  );
}

export default UserEdit;
