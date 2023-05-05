import React, { useState, useEffect, useCallback } from "react";
import { getActas } from "../../services/ActaController";
import { Link } from "react-router-dom";
import ActaDelete from "./ActaDelete";
import { useUserContext } from "../../contexts/UserContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import deptEdu from "../../resources/images/dept_edu.jpg";

export default function ActaList() {
  const [actas, setActas] = useState([]);
  const { userId, userRole, userName } = useUserContext();
  const [filter, setFilter] = useState("sin_filtro");

  async function handleDownloadPDF(acta, user) {
    const pdf = new jsPDF();
    const filename = `Acta_${acta.nom}.pdf`;

    const div = document.createElement("div");
    div.innerHTML = `
  
    <div style="display: flex; align-items: center;">
      <img src="${deptEdu}" style="width: 250px; height: auto; margin-right: 10px;">
      <h3 style="text-align: right; flex: 1;">ACTA REUNIÓ DE CARÀCTER GENERAL</h3>
    </div>

    <div style="display: flex; width: 100%;">
      <div style="flex: 1; border: 2px solid #000; padding: 10px;">
        <h4>CONVOCATORIA:</h4>
        <span>${acta.convocatoria.nom}</span>
        <h4>DATA:</h4>
        <span>${acta.convocatoria.data}</span>
        <h4>LLOC:</h4>
        <span>${acta.convocatoria.lloc}</span>
      </div>
      <div style="flex: 1; border: 2px solid #000; padding: 10px; margin-left: -2px;">
        <h4>HORA INICI:</h4>
        <span>${acta.convocatoria.horaInici}</span>
        <h4>DURADA:</h4>
        <span>${acta.convocatoria.durada + "min"}</span>
        <h4>ASSISTENTS:</h4>
        <span>${acta.assistents.map((assistent) => assistent.nom + " " + assistent.cognom).join(", ")}</span>
      </div>
    </div>

    <br></br>

    <h4 style="font-size: 14px; margin-bottom: 10px;">PUNTS PRINCIPALS DE DELIBERACIÓ:</h4>
    <pre style="font-size: 12px; margin-bottom: 5px;">1. Aprovació l’acta de la sessió anterior (data:x/x/x)</pre>
    <pre style="font-size: 12px; margin-bottom: 5px;">2. Comprovació de que els membres de l’òrgan que no van assistir a la sessió anterior han rebut
la informació corresponent als temes tractats en la sessió o han llegit l’acta de la sessió anterior.</pre>
    <pre style="font-size: 12px; margin-bottom: 5px;">3. Anàlisi de l’estat d’execució dels acords presos en la darrera reunió (o darreres reunions).</pre>
    <pre style="font-size: 12px; margin-bottom: 5px;">4. Assumptes de tràmit i informacions diverses.</pre>
    <pre style="font-size: 12px; margin-bottom: 5px;">5. Torn obert de paraules.</pre>
    
    <br></br>

    <table>
      <tr style="background-color: #f2f2f2;">
        <th>Nom</th>
        <th>Estat</th>
        <th>Descripcions</th>
        <th>Convocatòria</th>
        <th>Acords</th>
        <th>Creador</th>
      </tr>
      <tr>
        <td>${acta.nom}</td>
        <td>${acta.estat}</td>
        <td>${acta.descripcions.join(", ")}</td>
        <td>${acta.convocatoria.nom}</td>
        <td>${acta.acords.map((acord) => acord.nom).join(", ")}</td>
        <td>${acta.creador ? acta.creador.nom : "null"}</td>
      </tr>
      <tr>
        <th>Remitente</th>
      </tr>
      <tr>
        <td>${user}</td>
      </tr>
    </table>
    `;

    div.setAttribute(
      "style",
      "display: inline-table; width: auto; height: auto; background-color: white; border-collapse: collapse; font-family: Arial, sans-serif;"
    );
    div.querySelectorAll("th, td").forEach((cell) => {
      cell.style.border = "1px solid #dddddd";
      cell.style.padding = "8px";
      cell.style.textAlign = "left";
    });

    const divWrapper = document.createElement("div");
    divWrapper.setAttribute(
      "style",
      "position: absolute; top: -9999px; left: -9999px;"
    );
    divWrapper.appendChild(div);
    document.body.appendChild(divWrapper);

    const canvas = await html2canvas(div);
    const imgData = canvas.toDataURL("image/png");

    pdf.addImage(imgData, "PNG", 10, 10);
    pdf.save(filename);

    document.body.removeChild(divWrapper);
  }

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
      <select
        value={filter}
        onChange={handleFilterChange}
        className="acta-select"
      >
        <option value="sin_filtro">Sin filtro</option>
        <option value="Oberta">Oberta</option>
        <option value="Tancada">Tancada</option>
      </select>
      <table className="acta-table">
        <thead>
          <tr>
            <th>Nom </th>
            <th>Estat</th>
            <th>Descripcions</th>
            <th>Convocatòria</th>
            <th>Acords</th>
            <th>Assistents</th>
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
                  <li className="acta-list-style" key={descripcio}>
                    {descripcio}
                  </li>
                ))}
              </td>
              <td>{acta.convocatoria.nom}</td>
              <td>
                {acta.acords.map((acord) => (
                  <li className="acta-list-style" key={acord}>
                    {acord.nom}
                  </li>
                ))}
              </td>
              <td>
                {acta.assistents.map((assistent) => (
                  <li className="acta-list-style" key={assistent}>
                    {assistent.nom}
                  </li>
                ))}
              </td>
              <td>{acta.creador ? acta.creador.nom : "null"}</td>
              <td>
                {(userRole === "administrador" ||
                  acta.creador._id === userId) && (
                  <>
                    <Link
                      className="acta-page-link"
                      to={`/actas/edit/${acta._id}`}
                    >
                      Editar
                    </Link>{" "}
                    <ActaDelete
                      className="acta-delete"
                      actaId={acta._id}
                      onUpdate={fetchActas}
                    />
                    <button
                      className="acta-page-link"
                      onClick={() => handleDownloadPDF(acta, userName)}
                    >
                      Descarregar PDF
                    </button>
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
