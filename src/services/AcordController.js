import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL;

const acordsURL = `${API_URL}/acords`;

export async function getAcords() {
  const token = Cookies.get('token');
  const response = await fetch(acordsURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.list;
  } else {
    let error;
    try {
      error = await response.json();
    } catch (e) {
      error = { message: response.statusText || "Error fetching acords" };
    }
    throw new Error(error.message);
  }
}

export async function createAcord(acord) {
  const token = Cookies.get("token");
  const response = await fetch(acordsURL + "/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(acord),
  });

  if (!response.ok) {
    throw new Error("Error al crear el acord");
  }
}

export async function updateAcord(id, acord) {
  const token = Cookies.get("token");
  const response = await fetch(acordsURL + "/update/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(acord),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el acord");
  }
}

export async function deleteAcord(id) {
  const token = Cookies.get("token");
  const response = await fetch(acordsURL + "/delete/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el acord");
  }
}

