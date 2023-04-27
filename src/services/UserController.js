import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL;

const userURL = `${API_URL}/user`;

export async function updateUser(id, user) {
  const token = Cookies.get("token");
  const response = await fetch(userURL + "/update/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al actualizar el usuario");
  }

  return await response.json();
}

export async function deleteUser(id) {
  const token = Cookies.get('token');
  const response = await fetch(userURL + '/delete/' + id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al eliminar el usuario');
  }

  return await response.json();
}
