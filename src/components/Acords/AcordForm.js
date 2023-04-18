import React, { useState } from "react";

function AcordForm({
    onSubmit,
    initialAcord = {
        dataInici: "",
        dataFinal: "",
        descripcio: "",
        acta: "",
    },
    actaList = [],
}) {
    const [acord, setAcord] = useState(initialAcord);

    function handleChange(e) {
        const { name, value } = e.target;
        setAcord((prevState) => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(acord);
    }

    return (
        <form onSubmit={handleSubmit} className="acord-form-container">
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
                    value={acord.acta}
                    onChange={handleChange}
                    required
                    className="acord-form__input"
                >
                    <option value="">Selecciona una acta</option>
                    {actaList.map((acta) => (
                        <option key={acta._id} value={acta._id}>
                            {acta.convocatoria.lloc}
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
