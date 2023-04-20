import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getActas, updateActa } from "../../services/ActaController";
import { getConvocatorias } from "../../services/ConvocatoriaController";
import { getAcords } from "../../services/AcordController";
import ActaForm from "./ActaForm";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

function ActaEdit() {
  const [acta, setActa] = useState(null);
  const [convocatoriaList, setConvocatoriaList] = useState([]);
  const [acordList, setAcordList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId, userRole } = useUserContext();

  useEffect(() => {
    async function fetchActa() {
      try {
        const actas = await getActas();
        const actaFound = actas.find((a) => a._id === id);
        if (actaFound && (userRole === "administrador" || actaFound.creador._id === userId)) {
          setActa(actaFound);
        }else {
          // Enviar al usuario al inicio si no tiene permiso para editar
          alert("No tienes permiso para editar esta convocatoria.");
          navigate("/");
        }

        const convocatorias = await getConvocatorias();
        setConvocatoriaList(convocatorias);

        const acords = await getAcords();
        setAcordList(acords);
      } catch (error) {
        console.error("Error fetching acta:", error);
      }
    }

    fetchActa();
  }, [id, userId, userRole, navigate]);

  async function handleSubmit(updatedActa) {
    try {
      await updateActa(id, updatedActa);
      alert("Acta actualizada correctamente.");
      navigate("/actas");
    } catch (error) {
      console.error("Error updating acta:", error);
      alert("Error al actualizar el acta.");
    }
  }

  return (
    <div className="acta-page-container">
      <h2 className="acta-form-title">Editar acta</h2>
      {acta ? (
        <ActaForm onSubmit={handleSubmit} initialActa={acta} convocatoriaList={convocatoriaList} acordList={acordList} />
      ) : (
        <p>Cargando acta...</p>
      )}
    </div>
  );
}

export default ActaEdit;
