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
                console.error("Error cercant dades:", error);
            }
        }

        fetchLists();
    }, []);

    async function handleCreate(convocatoria) {
        try {
            await createConvocatoria(convocatoria);
            navigate("/convocatorias");
        } catch (error) {
            console.error("Error creant convocatòria:", error);
        }
    }

    return (
        <div className="convocatoria-form-container">
            <h1>Nova convocatòria</h1>
            <ConvocatoriaForm onSubmit={handleCreate} usersList={usersList} grupsList={grupsList} plantillasList={plantillasList} />
            <Link className="convocatoria-form__button" to="/convocatorias">Tornar a la llista de convocatòries</Link>
        </div>
    );
}

export default ConvocatoriaCreatePage;
