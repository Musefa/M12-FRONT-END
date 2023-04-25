import React, { useState, useEffect, useCallback } from "react";
import { getActas } from "../../services/ActaController";
import { Link } from "react-router-dom";
import ActaDelete from "./ActaDelete";
import { useUserContext } from "../../contexts/UserContext";

export default function ActaList() {
  const [actas, setActas] = useState([]);
  const { userId, userRole } = useUserContext();
  const [filter, setFilter] = useState("sin_filtro");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const fetchActas = useCallback(async () => {
    try {
      const fetchedActas = await getActas();

      const filteredActas = fetchedActas.filter((acta) => {
        const isResponsable = acta.convocatoria.responsable._id === userId;
        const isConvocado = acta.convocatoria.convocats.some((grup) =>
          grup.membres.some((user) => user._id === userId)
        );
        const isCreador = acta.creador && acta.creador._id === userId;

        const userRelated = isResponsable || isConvocado || isCreador;
        if (filter === "sin_filtro") {
          return userRole === "administrador" || userRelated;
        }

        if (filter === "Oberta" || filter === "Tancada") {
          return (
            (userRole === "administrador" || userRelated) &&
            acta.estat.toLowerCase() === filter.toLowerCase()
          );
        }

        return false;
      });

      setActas(filteredActas);
    } catch (error) {
      console.error("Error cercant actas:", error);
    }
  }, [userId, userRole, filter]);

  useEffect(() => {
    fetchActas();
  }, [fetchActas]);


  return (
    <div>
      <select value={filter} onChange={handleFilterChange}>
        <option value="sin_filtro">Sin filtro</option>
        <option value="Oberta">Oberta</option>
        <option value="Tancada">Tancada</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Nom </th>
            <th>Estat</th>
            <th>Descripcions</th>
            <th>Convocatòria</th>
            <th>Acords</th>
            <th>Creador</th>
            <th>Accions</th>
          </tr>
        </thead>
        <tbody>
          {actas.map((acta) => (
            <tr key={acta._id}>
              <td>{acta.nom}</td>

              <td>{acta.estat}</td>
              <td>
                {acta.descripcions.map((descripcio) => (
                  <li className="acta-list-style" key={descripcio}>{descripcio}</li>
                ))}
              </td>
              <td>{acta.convocatoria.nom}</td>
              <td>
                {acta.acords.map((acord) => (
                  <li className="acta-list-style" key={acord}>{acord.nom}</li>
                ))}
              </td>
              <td>{acta.creador ? acta.creador.nom : "null"}</td>
              <td>
                {(userRole === "administrador" || acta.creador._id === userId) && (
                  <>
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
