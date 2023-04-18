import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getActas } from "../../services/ActaController";
import { getAcords, updateAcord } from "../../services/AcordController";
import AcordForm from "./AcordForm";
import { useNavigate } from "react-router-dom";

function AcordEdit() {
  const [acord, setAcord] = useState(null);
  const [actaList, setActaList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAcord() {
      try {
        const acords = await getAcords();
        const acordFound = acords.find((a) => a._id === id);
        if (acordFound) {
          setAcord(acordFound);
        }

        const actas = await getActas();
        setActaList(actas);
      } catch (error) {
        console.error("Error fetching acord:", error);
      }
    }

    fetchAcord();
  }, [id]);

  async function handleSubmit(updatedAcord) {
    try {
      await updateAcord(id, updatedAcord);
      alert("Acuerdo actualizado correctamente.");
      navigate("/acords");
    } catch (error) {
      console.error("Error updating acord:", error);
      alert("Error al actualizar el acuerdo.");
    }
  }

  return (
    <div className="acord-page-container">
      <h2 className="acord-page-title">Editar Acuerdo</h2>
      {acord ? (
        <AcordForm onSubmit={handleSubmit} initialAcord={acord} actaList={actaList} />
      ) : (
        <p>Cargando acuerdo...</p>
      )}
    </div>
  );
}

export default AcordEdit;
