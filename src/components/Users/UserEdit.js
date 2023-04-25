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
        console.error("Error cercant usuari:", error);
      }
    }

    fetchUser();
  }, [id]);

  async function handleUserInfoSubmit(updatedUserInfo) {
    try {
      await updateUser(id, updatedUserInfo);
      navigate("/");
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  }

  async function handlePasswordChangeSubmit(passwordInfo) {
    try {
      await updateUser(id, passwordInfo);
      navigate("/");
    } catch (error) {
      console.error("Error actualitzant contrasenya:", error);
    }
  }

  return (
    <div className="user-form-container">
      <h2>Editar l'informació de l'usuari</h2>
      {user ? (
        <>
          <UserInfoForm onSubmit={handleUserInfoSubmit} initialUser={user} />
          <PasswordChangeForm onSubmit={handlePasswordChangeSubmit} />
        </>
      ) : (
        <p>Carregant usuari...</p>
      )}
    </div>
  );
}

export default UserEdit;
