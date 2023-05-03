import React, { useState, useEffect, useCallback } from "react";
import { getGrups, getUsersList } from "../../services/GrupController";
import { Link } from "react-router-dom";
import GrupDelete from "./GrupDelete";
import { useUserContext } from "../../contexts/UserContext";

function GrupList() {
  const [grups, setGrups] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const { userId, userRole } = useUserContext();

  const fetchGrups = useCallback(async () => {
    try {
      const grups = await getGrups();
      const userGrups = userRole === "administrador" ? grups : grups.filter(
        (grup) =>
          grup.membres.some((membre) => membre._id === userId) ||
          grup.creador._id === userId
      );
      setGrups(userGrups);
    } catch (error) {
      console.error("Error cercant grups:", error);
    }
  }, [userId, userRole]);

  const fetchUsers = useCallback(async () => {
    try {
      const users = await getUsersList();
      setUsersList(users);
    } catch (error) {
      console.error("Error cercant usuaris:", error);
    }
  }, []);

  useEffect(() => {
    fetchGrups();
    fetchUsers();
  }, [fetchGrups, fetchUsers]);

  function getUserById(userId) {
    return usersList.find((user) => user._id === userId);
  }

  return (
    <>
      <table className="grup-form__table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Tipus</th>
            <th>Membres</th>
            <th>Creador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {grups ? (
            grups.map((grup) => (
              <tr key={grup._id} className="grup-form__row">
                <td>
                  <strong>{grup.nom}</strong>
                </td>
                <td>
                  <small>{grup.tipus}</small>
                </td>
                <td>
                  <ul className="grup-form__membres-list">
                    {grup.membres.map((membre) => {
                      const user = getUserById(membre._id);
                      return (
                        <li key={membre._id}>{user ? user.nom : "Usuari desconegut"}</li>
                      );
                    })}
                  </ul>
                </td>
                <td>{grup.creador.nom}</td>
                <td className="grup-delete">
                  {(userRole === "administrador" ||
                    userRole === "directiu" ||
                    (userRole === "administrador" && grup.tipus !== "Públic") ||
                    grup.creador._id === userId) && (
                      <>
                        <Link to={`/grups/edit/${grup._id}`} className="grup-form__button">
                          Editar
                        </Link>
                        <GrupDelete grupId={grup._id} onUpdate={fetchGrups} />
                      </>
                    )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No s'han trobat grups</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default GrupList;
