import React, { useState, useEffect, useCallback } from "react";
import { getAcords } from "../../services/AcordController";
import { Link } from "react-router-dom";
import AcordDelete from "./AcordDelete";
import { useUserContext } from "../../contexts/UserContext";

export default function AcordList() {
  const [acords, setAcords] = useState([]);
  const { userId, userRole } = useUserContext();

  const filterAcords = useCallback(
    (acords) => {
      return acords.filter((acord) => {
        const isResponsable = acord.acta.convocatoria.responsable._id === userId;
        const isConvocado = acord.acta.convocatoria.convocats.some((grup) =>
          grup.membres.some((user) => user._id === userId)
        );
        const isCreador = acord.creador && acord.creador._id === userId;
        return isResponsable || isConvocado || isCreador;
      });
    },
    [userId]
  );

  const fetchAcords = useCallback(async () => {
    try {
      const acords = await getAcords();
      const filteredAcords = userRole === "administrador" ? acords : filterAcords(acords);
      setAcords(filteredAcords);
    } catch (error) {
      console.error("Error cercant acords:", error);
    }
  }, [filterAcords, userRole]);

  useEffect(() => {
    fetchAcords();
  }, [fetchAcords]);

  return (
    <div>
      <table className="acord-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Data Inici</th>
            <th>Data Final</th>
            <th>Descripció</th>
            <th>Acta</th>
            <th>Creador</th>
            <th>Accions</th>
          </tr>
        </thead>
        <tbody>
          {acords.map((acord) => (
            <tr key={acord._id}>
              <td>{acord.nom}</td>
              <td>{new Date(acord.dataInici).toLocaleDateString()}</td>
              <td>{new Date(acord.dataFinal).toLocaleDateString()}</td>
              <td>{acord.descripcio}</td>
              <td>{acord.acta.nom}</td>
              <td>{acord.creador ? acord.creador.nom : "null"}</td>
              <td>
                {(userRole === "administrador" || acord.creador._id === userId) && (
                  <>
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
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
