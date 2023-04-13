import React, { useState, useEffect } from "react";
import { getGrups } from "../services/GrupController";
import { Link } from "react-router-dom";
import GrupDelete from "./GrupDelete";

function GrupList() {
  const [grups, setGrups] = useState([]);

  useEffect(() => {
    console.log(grups)
    fetchGrups();
  }, []);

  async function fetchGrups() {
    try {
      const grups = await getGrups();
      console.log(grups)
      setGrups(grups);
    } catch (error) {
      console.error("Error fetching grups:", error);
    }
  }

  return (
    <>
    <ul>
      {grups ? (
        grups.map((grup) => (
          <li key={grup._id}>
            <strong>{grup.nom}</strong><br />
            <small>Membres:</small>
            <ul>
              {grup.membres.map((membre) => (
                <li key={membre._id}>{membre.nom}</li>
              ))}
            </ul>
            {console.log(grup)}
            <Link to={`/grups/edit/${grup._id}`}>Editar</Link> {/* Agrega esta línea */}
            <GrupDelete grupId={grup._id} onUpdate={fetchGrups} /> {/* Agrega esta línea */}
          </li>
        ))
      ) : (
        <li>No se encontraron grupos</li>
      )}
    </ul>
  </>
  );
}

export default GrupList;
