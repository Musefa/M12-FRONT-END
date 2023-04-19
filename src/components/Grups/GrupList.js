import React, { useState, useEffect, useCallback } from "react";
import { getGrups, getUsersList } from "../../services/GrupController";
import { Link } from "react-router-dom";
import GrupDelete from "./GrupDelete";
import { useUserContext } from "../../contexts/UserContext";

function GrupList() {
  const [grups, setGrups] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const { userId } = useUserContext();

  const fetchGrups = useCallback(async () => {
    try {
      const grups = await getGrups();
      const userGrups = grups.filter(grup => grup.membres.some(membre => membre._id === userId));
      setGrups(userGrups);
    } catch (error) {
      console.error("Error fetching grups:", error);
    }
  }, [userId]);

  const fetchUsers = useCallback(async () => {
    try {
      const users = await getUsersList();
      setUsersList(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  useEffect(() => {
    fetchGrups();
    fetchUsers();
  }, [fetchGrups, fetchUsers]);

  function getUserById(userId) {
    return usersList.find(user => user._id === userId);
  }

  return (
    <>
      <ul className="plantilla-form__item">
        {grups ? (
          grups.map((grup) => (
            <li key={grup._id} className="plantilla-form__item">
              <strong>{grup.nom}</strong>
              <br />
              Tipus: <small>{grup.tipus}</small>
              <br />
              <small>Membres:</small>
              <ul>
                {grup.membres.map((membre) => {
                  const user = getUserById(membre._id);
                  return (
                    <li className="plantilla-form__item" key={membre._id}>{user ? user.nom : 'Usuario desconocido'}</li>
                  );
                })}
              </ul>
              <br />
              <strong>Creador: </strong>
              {grup.creador.nom}
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
