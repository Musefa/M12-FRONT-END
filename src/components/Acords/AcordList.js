import React, { useState, useEffect } from "react";
import { getAcords } from "../../services/AcordController";
import { Link } from "react-router-dom";
import AcordDelete from "./AcordDelete";
import { useUserContext } from "../../contexts/UserContext";

export default function AcordList() {
  const [acords, setAcords] = useState([]);
  const { userId } = useUserContext();

  useEffect(() => {
    fetchAcords();
  });

  function filterAcords(acords) {
    return acords.filter((acord) => {
      const isResponsable = acord.acta.convocatoria.responsable._id === userId;
      const isConvocado = acord.acta.convocatoria.convocats.some((grup) =>
        grup.membres.some((user) => user._id === userId)
      );
      return isResponsable || isConvocado;
    });
  }

  async function fetchAcords() {
    try {
      const acords = await getAcords();
      setAcords(filterAcords(acords));
    } catch (error) {
      console.error("Error fetching acords:", error);
    }
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Data Inici</th>
            <th>Data Final</th>
            <th>Descripcio</th>
            <th>Acta</th>
            <th>Creador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {acords.map((acord) => (
            <tr key={acord._id}>
              <td>{acord.nom}</td>
              <td>{acord.dataInici}</td>
              <td>{acord.dataFinal}</td>
              <td>{acord.descripcio}</td>
              <td>{acord.acta.convocatoria.lloc}</td>
              <td>{acord.creador ? acord.creador.nom : "null"}</td>
              <td>
                <Link
                  className="plantilla-page-link"
                  to={`/acords/edit/${acord._id}`}
                >
                  Editar
                </Link>{" "}
                <AcordDelete
                  className="plantilla-delete"
                  acordId={acord._id}
                  onUpdate={fetchAcords}
                />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
