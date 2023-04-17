import Cookies from "js-cookie";

const convocatoriasURL = "http://localhost:5000/convocatorias";

export async function getConvocatorias() {
  const token = Cookies.get('token');
  const response = await fetch(convocatoriasURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.lista;
  } else {
    let error;
    try {
      error = await response.json();
    } catch (e) {
      error = { message: response.statusText || "Error fetching convocatorias" };
    }
    throw new Error(error.message);
  }
}

export async function createConvocatoria(convocatoria) {
  const token = Cookies.get("token");
  const response = await fetch(convocatoriasURL + "/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(convocatoria),
  });

  if (!response.ok) {
    throw new Error("Error al crear la convocatoria");
  }
}

export async function updateConvocatoria(id, convocatoria) {
  const token = Cookies.get("token");
  const response = await fetch(convocatoriasURL + "/update/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(convocatoria),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la convocatoria");
  }
}

export async function deleteConvocatoria(id) {
  const token = Cookies.get("token");
  const response = await fetch(convocatoriasURL + "/delete/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la convocatoria");
  }
}

