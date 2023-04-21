import React, { useState, useEffect, useCallback } from "react";
import { getConvocatorias } from "../../services/ConvocatoriaController";
import { Link } from "react-router-dom";
import ConvocatoriaDelete from "./ConvocatoriaDelete";
import { useUserContext } from "../../contexts/UserContext";

export default function ConvocatoriaList() {
  const [convocatorias, setConvocatorias] = useState([]);
  const { userId, userRole } = useUserContext();

  const filterConvocatorias = useCallback(
    (convocatorias) => {
      return convocatorias.filter((convocatoria) => {
        const isResponsable = convocatoria.responsable._id === userId;
        const isConvocado = convocatoria.convocats.some((grup) =>
          grup.membres.some((user) => user._id === userId)
        );
        const isCreador = convocatoria.creador && convocatoria.creador._id === userId;
        return isResponsable || isConvocado || isCreador;
      });
    },
    [userId]
  );

  const fetchConvocatorias = useCallback(async () => {
    try {
      const convocatorias = await getConvocatorias();
      const filteredConvocatorias = userRole === "administrador" ? convocatorias : filterConvocatorias(convocatorias);
      setConvocatorias(filteredConvocatorias);
    } catch (error) {
      console.error("Error fetching convocatorias:", error);
    }
  }, [filterConvocatorias, userRole]);

  useEffect(() => {
    fetchConvocatorias();
  }, [fetchConvocatorias]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Data</th>
            <th>Hora Inici</th>
            <th>Durada</th>
            <th>Lloc</th>
            <th>Punts del Dia</th>
            <th>Convocats</th>
            <th>Plantilla Punts</th>
            <th>Responsable</th>
            <th>Creador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {convocatorias.map((convocatoria) => (
            <tr key={convocatoria._id}>
              <td>{convocatoria.nom}</td>
              <td>{convocatoria.data}</td>
              <td>{convocatoria.horaInici}</td>
              <td>{convocatoria.durada}</td>
              <td>{convocatoria.lloc}</td>
              <td>
                {convocatoria.puntsOrdreDia.map((punts) => (
                  <li className="plantilla-form__item" key={punts}>{punts}</li>
                ))}
              </td>
              <td>
                {convocatoria.convocats.map((grup) => (
                  <ul key={grup._id}>
                    {grup.membres.map((user) => (
                      <li className="plantilla-form__item" key={user._id}>{user.nom}</li>
                    ))}
                  </ul>
                ))}
              </td>
              <td>
                {convocatoria.plantilla.puntsOrdreDia.map((punts) => (
                  <li className="plantilla-form__item" key={punts}>{punts}</li>
                ))}
              </td>
              <td>{convocatoria.responsable.nom}</td>
              <td>{convocatoria.creador ? convocatoria.creador.nom : "null"}</td>
              <td>
                {(userRole === "administrador" || convocatoria.creador._id === userId) && (
                  <>
                    <Link
                      className="plantilla-page-link"
                      to={`/convocatorias/edit/${convocatoria._id}`}
                    >
                      Editar
                    </Link>
                    <ConvocatoriaDelete
                      className="plantilla-delete"
                      convocatoriaId={convocatoria._id}
                      onUpdate={fetchConvocatorias}
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
