import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL;

const actasURL = `${API_URL}/actas`;

export async function getActas() {
  const token = Cookies.get("token");
  const response = await fetch(actasURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
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
      error = { message: response.statusText || "Error fetching actas" };
    }
    throw new Error(error.message);
  }
}

export async function createActa(acta) {
  const token = Cookies.get("token");
  const response = await fetch(actasURL + "/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(acta),
  });

  if (!response.ok) {
    throw new Error("Error al crear el acta");
  }
}

export async function updateActa(id, acta) {
  const token = Cookies.get("token");
  const response = await fetch(actasURL + "/update/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(acta),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el acta");
  }
}

export async function deleteActa(id) {
  const token = Cookies.get("token");
  const response = await fetch(actasURL + "/delete/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el acta");
  }
}
