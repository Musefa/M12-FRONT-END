import React, { useState, useEffect } from "react";
import { getActas } from "../../services/ActaController";
import { Link } from "react-router-dom";
import ActaDelete from "./ActaDelete";
import { useUserContext } from "../../contexts/UserContext";

export default function ActaList() {
  const [actas, setActas] = useState([]);
  const { userId } = useUserContext();

  useEffect(() => {
    fetchActas();
  });

  function filterActas(actas) {
    return actas.filter((acta) => {
      const isResponsable = acta.convocatoria.responsable._id === userId;
      const isConvocado = acta.convocatoria.convocats.some((grup) =>
        grup.membres.some((user) => user._id === userId)
      );
      return isResponsable || isConvocado;
    });
  }

  async function fetchActas() {
    try {
      const actas = await getActas();
      setActas(filterActas(actas));
    } catch (error) {
      console.error("Error fetching actas:", error);
    }
  }
  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nom </th>
            <th>Estat</th>
            <th>Descripcions</th>
            <th>Convocatoria</th>
            <th>Acords</th>
            <th>Creador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {actas.map((acta) => (
            <tr key={acta._id}>
              <td>{acta.nom}</td>

              <td>{acta.estat}</td>
              <td>
                {acta.descripcions.map((descripcio) => (
                  <li key={descripcio}>{descripcio}</li>
                ))}
              </td>
              <td>{acta.convocatoria.lloc}</td>
              <td>
                {acta.acords.map((acord) => (
                  <li key={acord}>{acord.descripcio}</li>
                ))}
              </td>
              <td>{acta.creador ? acta.creador.nom : "null"}</td>
              <td>
                <Link
                  className="plantilla-page-link"
                  to={`/actas/edit/${acta._id}`}
                >
                  Editar
                </Link>{" "}
                <ActaDelete
                  className="plantilla-delete"
                  actaId={acta._id}
                  onUpdate={fetchActas}
                />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
