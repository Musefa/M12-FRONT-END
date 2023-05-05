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
        console.error("Error cercant dades:", error);
      }
    }

    fetchLists();
  }, []);

  async function handleCreate(acta) {
    try {
      await createActa(acta);
      navigate("/actas");
    } catch (error) {
      console.error("Error creating acta:", error);
    }
  }

  return (
    <div className="acta-form-container">
      <h1>Nova acta</h1>
      <ActaForm onSubmit={handleCreate} convocatoriaList={convocatoriaList} acordList={acordList} />
      <Link className="acta-form__button" to="/actas">Tornar a la llista de actes</Link>
    </div>
  );
}

export default ActaCreatePage;
