import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGrups, updateGrup, getUsersList } from "../../services/GrupController";
import GrupForm from "./GrupForm";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

function GrupEdit() {
  const [grup, setGrup] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId, userRole } = useUserContext();

  useEffect(() => {
    async function fetchGrup() {
      try {
        const grups = await getGrups();
        const grupFound = grups.find((g) => g._id === id);
        if (grupFound) {
          if (
            !(userRole === "directiu" || userRole === "administrador" ||
              (userRole === "administrador" && grupFound.tipus !== "Públic") ||
              grupFound.creador._id === userId)
          ) {
            console.error("No tens permís per a editar aquest grup.");
            navigate("/");
          } else {
            setGrup(grupFound);
          }
        }
        const users = await getUsersList();
        setUsersList(users);
      } catch (error) {
        console.error("Error cercant grup:", error);
      }
    }

    fetchGrup();
  }, [id, userId, userRole, navigate]);

  async function handleSubmit(updatedGrup) {
    try {
      await updateGrup(id, updatedGrup);
      navigate("/grups");
    } catch (error) {
      console.error("Error actualitzant grup:", error);
    }
  }

  return (
    <div className="grup-page-container">
      <h2 className="grup-form-title">EDITAR GRUPO</h2>
      {grup ? (
        <GrupForm onSubmit={handleSubmit} initialGrup={grup} usersList={usersList} />
      ) : (
        <p>Carregant grup...</p>
      )}
    </div>
  );
}

export default GrupEdit;
