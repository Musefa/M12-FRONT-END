import React, { useState, useEffect } from "react";
import GrupList from "../components/GrupList";
import GrupForm from "../components/GrupForm";
import { createGrup, getUsersList } from "../services/GrupController";
import { Link, useNavigate } from "react-router-dom";

function GrupCreate({ usersList }) {
  const navigate = useNavigate();

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

  return <GrupForm onSubmit={handleCreate} usersList={usersList} />;
}

function GrupPage() {
  const [usersList, setUsersList] = useState([]);

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

  return (
    <div>
      <h1>Página de grupos</h1>
      <Link to="/grups/create">Crear nuevo grupo</Link>
      <GrupCreate usersList={usersList} />
      <GrupList />
    </div>
  );
}

export { GrupCreate };
export default GrupPage;
