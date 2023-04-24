import React, { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

function AcordForm({
    onSubmit,
    initialAcord = {
        dataInici: "",
        dataFinal: "",
        descripcio: "",
        acta: "",
        creador: null
    },
    actaList = [],
}) {
    const { userId } = useUserContext();
    const [acord, setAcord] = useState({
        ...initialAcord,
        dataFinal: initialAcord.dataFinal? formatDate(initialAcord.dataFinal) : "",
        dataInici: initialAcord.dataInici? formatDate(initialAcord.dataInici) : "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setAcord((prevState) => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({ ...acord, creador: userId });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nom:
                <input
                    type="text"
                    name="nom"
                    value={acord.nom}
                    onChange={handleChange}
                    required
                    className="acord-form__input"
                />
            </label>
            <label>
                Data Inici:
                <input
                    type="date"
                    name="dataInici"
                    value={acord.dataInici}
                    onChange={handleChange}
                    required
                    className="acord-form__input"
                />
            </label>
            <label>
                Data Final:
                <input
                    type="date"
                    name="dataFinal"
                    value={acord.dataFinal}
                    onChange={handleChange}
                    required
                    className="acord-form__input"
                />
            </label>
            <label>
                Descripcio:
                <input
                    type="text"
                    name="descripcio"
                    value={acord.descripcio}
                    onChange={handleChange}
                    required
                    className="acord-form__input"
                />
            </label>
            <label>
                Acta:
                <select
                    name="acta"
                    defaultValue={acord.acta}
                    onChange={handleChange}
                    required
                    className="acord-form__input"
                >
                    <option value="">Selecciona una acta</option>
                    {actaList.map((acta) => (
                        <option key={acta._id} value={acta._id} selected={acta._id}>
                            {acta.nom}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit" className="acord-form__button">
                Guardar
            </button>
        </form>
    );
}

export default AcordForm;
