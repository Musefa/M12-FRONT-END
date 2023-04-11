import Cookies from "js-cookie";

const plantillasURL = "http://localhost:5000/plantillas";

export async function getPlantillas() {
  const token = Cookies.get('token');
  const response = await fetch(plantillasURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.docs;
  } else {
    let error;
    try {
      error = await response.json();
    } catch (e) {
      error = { message: response.statusText || "Error fetching plantillas" };
    }
    throw new Error(error.message);
  }
}

export async function createPlantilla(plantilla) {
  const token = Cookies.get("token");
  const response = await fetch(plantillasURL + "/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(plantilla),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al crear la plantilla");
  }

  return await response.json();
}

export async function updatePlantilla(id, plantilla) {
  const token = Cookies.get("token");
  const response = await fetch(plantillasURL + "/update/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(plantilla),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al actualizar la plantilla");
  }

  return await response.json();
}