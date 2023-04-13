import React, { useState, useEffect } from "react";
import GrupForm from "../components/GrupForm";
import { createGrup, getUsersList } from "../services/GrupController";
import { Link, useNavigate } from "react-router-dom";

function GrupCreatePage() {
  const [usersList, setUsersList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getUsersList();
        setUsersList(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  async function handleCreate(grup) {
    try {
      await createGrup(grup);
      alert("Grupo creado correctamente.");
      navigate("/grups");
    } catch (error) {
      console.error("Error creating grup:", error);
      alert("Error al crear el grupo.");
    }
  }

  return (
    <div>
      <h1>Crear nuevo grupo</h1>
      <GrupForm onSubmit={handleCreate} usersList={usersList} />
      <Link to="/grups">Volver a la lista de grupos</Link>
    </div>
  );
}

export default GrupCreatePage;
