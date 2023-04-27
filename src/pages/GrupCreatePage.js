import React, { useState, useEffect } from "react";
import GrupForm from "../components/Grups/GrupForm";
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
        console.error("Error cercant usuaris:", error);
      }
    }

    fetchUsers();
  }, []);

  async function handleCreate(grup) {
    try {
      await createGrup(grup);
      navigate("/grups");
    } catch (error) {
      console.error("Error creating grup:", error);
    }
  }

  return (
    <div className="grup-form-container">
      <h1>NOU GRUP</h1>
      <GrupForm onSubmit={handleCreate} usersList={usersList} />
      <Link className="grup-form__button" to="/grups">Tornar a la llista de grups</Link>
    </div>
  );
}

export default GrupCreatePage;
