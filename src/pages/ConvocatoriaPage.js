import React, { useEffect, useState } from "react";
import { getConvocatorias } from "../services/ConvocatoriaController";
import ConvocatoriaList from "../components/Convocatorias/ConvocatoriaList";

export default function ConvocatoriaPage() {
  const [convocatorias, setConvocatorias] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getConvocatorias();
        console.log(data);
        setConvocatorias(data);
      } catch (error) {
        console.error("Error fetching convocatorias:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Convocatorias</h1>
      <ConvocatoriaList convocatorias={convocatorias} />
    </div>
  );
}
