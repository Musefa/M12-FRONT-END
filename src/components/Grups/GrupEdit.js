import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGrups, updateGrup, getUsersList } from "../../services/GrupController";
import GrupForm from "./GrupForm";
import { useNavigate } from "react-router-dom";

function GrupEdit() {
  const [grup, setGrup] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGrup() {
      try {
        const grups = await getGrups();
        const grupFound = grups.find((g) => g._id === id);
        if (grupFound) {
          setGrup(grupFound);
        }

        const users = await getUsersList();
        setUsersList(users);
      } catch (error) {
        console.error("Error fetching grup:", error);
      }
    }

    fetchGrup();
  }, [id]);

  async function handleSubmit(updatedGrup) {
    try {
      await updateGrup(id, updatedGrup);
      alert("Grupo actualizado correctamente.");
      navigate("/grups");
    } catch (error) {
      console.error("Error updating grup:", error);
      alert("Error al actualizar el grupo.");
    }
  }

  return (
    <div className="plantilla-page-container">
      <h2 className="plantilla-form-title">Editar grupo</h2>
      {grup ? (
        <GrupForm onSubmit={handleSubmit} initialGrup={grup} usersList={usersList} />
      ) : (
        <p>Cargando grupo...</p>
      )}
    </div>
  );
}

export default GrupEdit;
