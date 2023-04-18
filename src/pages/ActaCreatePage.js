import React, { useState, useEffect } from "react";
import ActaForm from "../components/Actas/ActaForm";
import { createActa } from "../services/ActaController";
import { getConvocatorias } from "../services/ConvocatoriaController";
import { getAcords } from "../services/AcordController";
import { Link, useNavigate } from "react-router-dom";

function ActaCreatePage() {
  const [convocatoriaList, setConvocatoriaList] = useState([]);
  const [acordList, setAcordList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLists() {
      try {
        const convocatorias = await getConvocatorias();
        setConvocatoriaList(convocatorias);

        const acords = await getAcords();
        setAcordList(acords);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchLists();
  }, []);

  async function handleCreate(acta) {
    try {
      await createActa(acta);
      alert("Acta creada correctamente.");
      navigate("/actas");
    } catch (error) {
      console.error("Error creating acta:", error);
      alert("Error al crear el acta.");
    }
  }

  return (
    <div className="acta-form-container">
      <h1>Crear nueva acta</h1>
      <ActaForm onSubmit={handleCreate} convocatoriaList={convocatoriaList} acordList={acordList} />
      <Link to="/actas">Volver a la lista de actas</Link>
    </div>
  );
}

export default ActaCreatePage;
