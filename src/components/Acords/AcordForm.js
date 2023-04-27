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
        dataFinal: initialAcord.dataFinal ? formatDate(initialAcord.dataFinal) : "",
        dataInici: initialAcord.dataInici ? formatDate(initialAcord.dataInici) : "",
    });
    const [errors, setErrors] = useState({ nom: "", descripcio: "" });

    function validateNom(value) {
        return value.length >= 3 ? "" : "El nom ha de tenir com a mínim 3 lletres";
    }

    function validateDescripcio(value) {
        return value.length >= 10 ? "" : "La descripció ha de tenir com a mínim 10 lletres";
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setAcord((prevState) => ({ ...prevState, [name]: value }));
    }

    function handleChangeNom(e) {
        const value = e.target.value;
        setAcord({ ...acord, nom: value });
        setErrors({ ...errors, nom: validateNom(value) });
    }

    function handleChangeDescripcio(e) {
        const value = e.target.value;
        setAcord({ ...acord, descripcio: value });
        setErrors({ ...errors, descripcio: validateDescripcio(value) });
    }

    function handleChangeActa(e) {
        const selectedActaId = e.target.value;
        const updatedActa = actaList.find(acta => acta._id === selectedActaId);
        setAcord({ ...acord, acta: updatedActa });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({ ...acord, creador: userId });
    }

    function hasErrors() {
        if (errors.nom || !acord.nom || errors.descripcio || !acord.descripcio) return true;
        return false;
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nom:
                <input
                    type="text"
                    name="nom"
                    value={acord.nom}
                    onChange={handleChangeNom}
                    required
                    className="acord-form__input"
                />
                {errors.nom && <p className="error">{errors.nom}</p>}
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
                Descripció:
                <input
                    type="text"
                    name="descripcio"
                    value={acord.descripcio}
                    onChange={handleChangeDescripcio}
                    required
                    className="acord-form__input"
                />
                {errors.descripcio && <p className="error">{errors.descripcio}</p>}
            </label>
            <label>
                Acta:
                <select
                    name="acta"
                    value={acord.acta._id || ""}
                    onChange={handleChangeActa}
                    required
                    className="acord-form__input"
                >
                    <option value="">Selecciona una acta</option>
                    {actaList.map((acta) => (
                        <option key={acta._id} value={acta._id} >
                            {acta.nom}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit" className="acord-form__button" disabled={hasErrors()}>
                Guardar
            </button>
        </form>
    );
}

export default AcordForm;
