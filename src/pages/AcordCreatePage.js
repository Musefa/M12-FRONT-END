import React, { useState, useEffect } from "react";
import { createAcord } from "../services/AcordController";
import AcordForm from "../components/Acords/AcordForm";
import { getActas } from "../services/ActaController";
import { useNavigate } from "react-router-dom";

function AcordCreatePage() {
    const [actaList, setActaList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchActas() {
            try {
                const actas = await getActas();
                setActaList(actas);
            } catch (error) {
                console.error("Error cercant actas:", error);
            }
        }

        fetchActas();
    }, []);

    async function handleSubmit(acord) {
        try {
            await createAcord(acord);
            navigate("/acords");
        } catch (error) {
            console.error("Error creant acord:", error);
        }
    }

    return (
        <div className="acord-page-container">
            <h2 className="acord-page-title">NOU ACORD</h2>
            <AcordForm
                actaList={actaList}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default AcordCreatePage;
