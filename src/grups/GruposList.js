// En el archivo del componente donde quieres mostrar los datos
import { useEffect, useState } from "react";

function GruposList() {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/grups/api`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al obtener datos del servidor.");
        }
      })
      .then((data) => {
        setGrupos(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de grupos:", error);
      });
  }, []);

  return (
    <div>
      {/* Renderiza los grupos aquí */}
    </div>
  );
}

export default GruposList;
