import React from "react";

export default function ConvocatoriaList({ convocatorias }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora Inici</th>
            <th>Durada</th>
            <th>Lloc</th>
            <th>Punts del Dia</th>
            <th>Convocats</th>
            <th>Plantilla Punts</th>
            <th>Responsable</th>
          </tr>
        </thead>
        <tbody>
          {convocatorias.map((convocatoria) => (
            <tr key={convocatoria._id}>
              <td>{convocatoria.data}</td>
              <td>{convocatoria.horaInici}</td>
              <td>{convocatoria.durada}</td>
              <td>{convocatoria.lloc}</td>
              <td>
                {convocatoria.puntsOrdreDia.map((punts) => (
                  <li>{punts}</li>
                ))}
              </td>
              <td>
                {convocatoria.convocats.map((grup) => (
                  <ul key={grup._id}>
                    {grup.membres.map((user) => (
                      <li>{user.nom}</li>
                    ))}
                  </ul>
                ))}
              </td>
              <td>
                {convocatoria.plantilla.puntsOrdreDia.map((punts) => (
                  <li>{punts}</li>
                ))}
              </td>
              <td>{convocatoria.responsable.nom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
