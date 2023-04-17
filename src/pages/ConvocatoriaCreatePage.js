import React, { useState, useEffect } from "react";
import ConvocatoriaForm from "../components/Convocatorias/ConvocatoriaForm";
import { createConvocatoria } from "../services/ConvocatoriaController";
import { getUsersList, getGrups } from "../services/GrupController";
import { getPlantillas } from "../services/PlantillaController";
import { Link, useNavigate } from "react-router-dom";

function ConvocatoriaCreatePage() {
    const [usersList, setUsersList] = useState([]);
    const [grupsList, setGrupsList] = useState([]);
    const [plantillasList, setPlantillasList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchLists() {
            try {
                const users = await getUsersList();
                setUsersList(users);

                const grups = await getGrups();
                setGrupsList(grups);

                const plantillas = await getPlantillas();
                setPlantillasList(plantillas);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchLists();
    }, []);

    async function handleCreate(convocatoria) {
        try {
            await createConvocatoria(convocatoria);
            alert("Convocatoria creada correctamente.");
            navigate("/convocatorias");
        } catch (error) {
            console.error("Error creating convocatoria:", error);
            alert("Error al crear la convocatoria.");
        }
    }

    return (
        <div className="convocatoria-form-container">
            <h1>Crear nueva convocatoria</h1>
            <ConvocatoriaForm onSubmit={handleCreate} usersList={usersList} grupsList={grupsList} plantillasList={plantillasList} />
            <Link to="/convocatorias">Volver a la lista de convocatorias</Link>
        </div>
    );
}

export default ConvocatoriaCreatePage;
