import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateUser } from "../../services/UserController";
import { getUsersList } from "../../services/GrupController";
import UserForm from "./UserForm";
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

    async function handleSubmit(updatedUser) {
        try {
            await updateUser(id, updatedUser);
            alert("Usuario actualizado correctamente.");
            navigate("/");
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Error al actualizar el usuario.");
        }
    }

    return (
        <div className="user-form-container">
            <h2>Editar información de usuario</h2>
            {user ? (
                <UserForm onSubmit={handleSubmit} initialUser={user} />
            ) : (
                <p>Cargando usuario...</p>
            )}
        </div>
    );
}

export default UserEdit;