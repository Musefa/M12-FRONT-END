import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getConvocatorias, updateConvocatoria } from "../../services/ConvocatoriaController";
import { getGrups, getUsersList } from "../../services/GrupController";
import { getPlantillas } from "../../services/PlantillaController";
import ConvocatoriaForm from "./ConvocatoriaForm";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

function ConvocatoriaEdit() {
  const [convocatoria, setConvoctoria] = useState(null);
  const [grupsList, setGrupsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [plantillasList, setPlantillasList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId, userRole } = useUserContext();

  useEffect(() => {
    async function fetchConvocatoria() {
      try {
        const convocatorias = await getConvocatorias();
        const convocatoriaFound = convocatorias.find((c) => c._id === id);

        if (convocatoriaFound && (userRole === "administrador" || convocatoriaFound.creador._id === userId)) {
          setConvoctoria({
            ...convocatoriaFound,
            convocats: convocatoriaFound.convocats.map((grup) => grup._id),
            plantilla: convocatoriaFound.plantilla._id,
            responsable: convocatoriaFound.responsable._id,
          });
        } else {
          console.error("No tens permís per a editar aquesta convocatòria.");
          navigate("/");
        }

        const grups = await getGrups();
        setGrupsList(grups);

        const plantillas = await getPlantillas();
        setPlantillasList(plantillas);

        const users = await getUsersList();
        setUsersList(users);
      } catch (error) {
        console.error("Error cercant convocatòria:", error);
      }
    }

    fetchConvocatoria();
  }, [id, userId, userRole, navigate]);

  async function handleSubmit(updatedConvocatoria) {
    try {
      await updateConvocatoria(id, updatedConvocatoria);
      navigate("/convocatorias");
    } catch (error) {
      console.error("Error actualitzant convocatòria:", error);
    }
  }

  return (
    <div className="plantilla-page-container">
      <h2 className="plantilla-form-title">EDITAR CONVOCATÒRIA</h2>
      {convocatoria ? (
        <ConvocatoriaForm onSubmit={handleSubmit} initialConvocatoria={convocatoria} usersList={usersList} plantillasList={plantillasList} grupsList={grupsList} />
      ) : (
        <p>Carregant convocatòria...</p>
      )}
    </div>
  );
}

export default ConvocatoriaEdit;
