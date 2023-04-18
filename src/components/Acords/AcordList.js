import React, { useState, useEffect } from "react";
import { getAcords } from "../../services/AcordController";
import { Link } from "react-router-dom";
import AcordDelete from "./AcordDelete";

export default function AcordList() {
  const [acords, setAcords] = useState([]);

  useEffect(() => {
    fetchAcords();
  }, []);

  async function fetchAcords() {
    try {
      const acords = await getAcords();
      console.log(acords);
      setAcords(acords);
    } catch (error) {
      console.error("Error fetching acords:", error);
    }
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Data Inici</th>
            <th>Data Final</th>
            <th>Descripcio</th>
            <th>Acta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {acords.map((acord) => (
            <tr key={acord._id}>
              <td>{acord.dataInici}</td>
              <td>{acord.dataFinal}</td>
              <td>{acord.descripcio}</td>
              <td>{acord.acta.convocatoria.lloc}</td>
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
