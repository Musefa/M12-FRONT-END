import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getConvocatorias, updateConvocatoria } from "../../services/ConvocatoriaController";
import { getGrups, getUsersList } from "../../services/GrupController";
import { getPlantillas } from "../../services/PlantillaController";
import ConvocatoriaForm from "./ConvocatoriaForm";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext"; // Importar useUserContext

function ConvocatoriaEdit() {
  const [convocatoria, setConvoctoria] = useState(null);
  const [grupsList, setGrupsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [plantillasList, setPlantillasList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId, userRole } = useUserContext(); // Utilizar useUserContext para obtener el userId y userRole

  useEffect(() => {
    async function fetchConvocatoria() {
      try {
        const convocatorias = await getConvocatorias();
        const convocatoriaFound = convocatorias.find((c) => c._id === id);

        // Comprobar si el usuario actual es el creador o un administrador
        if (convocatoriaFound && (userRole === "administrador" || convocatoriaFound.creador._id === userId)) {
          setConvoctoria({
            ...convocatoriaFound,
            convocats: convocatoriaFound.convocats.map((grup) => grup._id),
            plantilla: convocatoriaFound.plantilla._id,
            responsable: convocatoriaFound.responsable._id,
          });
        } else {
          // Enviar al usuario al inicio si no tiene permiso para editar
          alert("No tienes permiso para editar esta convocatoria.");
          navigate("/");
        }

        const grups = await getGrups();
        setGrupsList(grups);

        const plantillas = await getPlantillas();
        setPlantillasList(plantillas);

        const users = await getUsersList();
        setUsersList(users);
      } catch (error) {
        console.error("Error fetching convocatoria:", error);
      }
    }

    fetchConvocatoria();
  }, [id, userId, userRole, navigate]);

  async function handleSubmit(updatedConvocatoria) {
    try {
      await updateConvocatoria(id, updatedConvocatoria);
      alert("Convocatoria actualizada correctamente.");
      navigate("/convocatorias");
    } catch (error) {
      console.error("Error updating convocatoria:", error);
      alert("Error al actualizar la convocatoria.");
    }
  }

  return (
    <div className="plantilla-page-container">
      <h2 className="plantilla-form-title">Editar convocatoria</h2>
      {convocatoria ? (
        <ConvocatoriaForm onSubmit={handleSubmit} initialConvocatoria={convocatoria} usersList={usersList} plantillasList={plantillasList} grupsList={grupsList} />
      ) : (
        <p>Cargando convocatoria...</p>
      )}
    </div>
 

  );
}

export default ConvocatoriaEdit;
