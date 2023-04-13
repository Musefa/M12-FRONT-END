import React, { useState, useEffect } from "react";
import { getUsers } from "../services/UserController";

function GrupForm({ onSubmit, initialGrup }) {
  const [grup, setGrup] = useState(initialGrup || {
    nom: "",
    tipus: "",
    membres: [],
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const userList = await getUsers();
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setGrup({ ...grup, [name]: value });
  }

  function handleMemberChange(event, index) {
    const { checked, value } = event.target;
    let newMembres = [...grup.membres];

    if (checked) {
      newMembres.push(value);
    } else {
      newMembres = newMembres.filter((id) => id !== value);
    }

    setGrup({ ...grup, membres: newMembres });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(grup);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nom">Nombre:</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={grup.nom}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="tipus">Tipo:</label>
        <input
          type="text"
          id="tipus"
          name="tipus"
          value={grup.tipus}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Miembros:</label>
        {users.map((user) => (
          <div key={user._id}>
            <input
              type="checkbox"
              id={`membre-${user._id}`}
              name={`membre-${user._id}`}
              value={user._id}
              checked={grup.membres.includes(user._id)}
              onChange={(event) => handleMemberChange(event, user._id)}
            />
            <label htmlFor={`membre-${user._id}`}>{user.name}</label>
          </div>
        ))}
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
}

export default GrupForm;
