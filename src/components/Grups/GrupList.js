import React, { useState, useEffect } from "react";
import { getGrups } from "../../services/GrupController";
import { Link } from "react-router-dom";
import GrupDelete from "./GrupDelete";

function GrupList() {
  const [grups, setGrups] = useState([]);

  useEffect(() => {
    fetchGrups();
  }, []);

  async function fetchGrups() {
    try {
      const grups = await getGrups();
      setGrups(grups);
    } catch (error) {
      console.error("Error fetching grups:", error);
    }
  }

  return (
    <>
      <ul className="plantilla-form__item">
        {grups ? (
          grups.map((grup) => (
            <li key={grup._id} className="plantilla-form__item">
              <strong>{grup.nom}</strong>
              <br />
              <small>Membres:</small>
              <ul>
                {grup.membres.map((membre) => (
                  <li className="plantilla-form__item" key={membre._id}>{membre.nom}</li>
                ))}
              </ul>
              <div className="plantilla-delete">
                <Link to={`/grups/edit/${grup._id}`} className="plantilla-form__button">
                  Editar
                </Link>
                <GrupDelete grupId={grup._id} onUpdate={fetchGrups} />
              </div>
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
