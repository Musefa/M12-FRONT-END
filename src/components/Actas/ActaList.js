import React, { useState, useEffect } from "react";
import { getActas } from "../../services/ActaController";
import { Link } from "react-router-dom";
import ActaDelete from "./ActaDelete";

export default function ActaList() {
  const [actas, setActas] = useState([]);

  useEffect(() => {
    fetchActas();
  }, []);

  async function fetchActas() {
    try {
      const actas = await getActas();
      setActas(actas);
    } catch (error) {
      console.error("Error fetching actas:", error);
    }
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Estat</th>
            <th>Descripcions</th>
            <th>Convocatoria</th>
            <th>Acords</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {actas.map((acta) => (
            <tr key={acta._id}>
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
