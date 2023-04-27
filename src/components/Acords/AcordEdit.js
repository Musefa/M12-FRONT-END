import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getActas } from "../../services/ActaController";
import { getAcords, updateAcord } from "../../services/AcordController";
import AcordForm from "./AcordForm";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

function AcordEdit() {
  const [acord, setAcord] = useState(null);
  const [actaList, setActaList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId, userRole } = useUserContext();

  useEffect(() => {
    async function fetchAcord() {
      try {
        const acords = await getAcords();
        const acordFound = acords.find((a) => a._id === id);
        if (acordFound && (userRole === "administrador" || acordFound.creador._id === userId)) {
          setAcord(acordFound);
        } else {
          navigate("/");
        }

        const actas = await getActas();
        setActaList(actas);
      } catch (error) {
        console.error("Error cercant acord:", error);
      }
    }

    fetchAcord();
  }, [id, userId, userRole, navigate]);

  async function handleSubmit(updatedAcord) {
    try {
      await updateAcord(id, updatedAcord);
      navigate("/acords");
    } catch (error) {
      console.error("Error actualitzant acord:", error);
    }
  }

  return (
    <div className="acord-page-container">
      <h2 className="acord-page-title">EDITAR ACORD</h2>
      {acord ? (
        <AcordForm onSubmit={handleSubmit} initialAcord={acord} actaList={actaList} />
      ) : (
        <p>Carregant acord...</p>
      )}
    </div>
  );
}

export default AcordEdit;
