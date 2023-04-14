import Cookies from "js-cookie";

const grupsURL = "http://localhost:5000/grups";

export async function getUsersList() {
  const token = Cookies.get('token');
  const response = await fetch(grupsURL + "/create", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data.usersList; // accede a la propiedad "usersList"
  } else {
    let error;
    try {
      error = await response.json();
    } catch (e) {
      error = { message: response.statusText || "Error fetching grups" };
    }
    throw new Error(error.message);
  }
}

export async function getGrups() {
  const token = Cookies.get('token');
  const response = await fetch(grupsURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.list; // accede a la propiedad "list"
  } else {
    let error;
    try {
      error = await response.json();
    } catch (e) {
      error = { message: response.statusText || "Error fetching grups" };
    }
    throw new Error(error.message);
  }
}

export async function createGrup(grup) {
  const token = Cookies.get("token");
  const response = await fetch(grupsURL + "/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(grup),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al crear el grupo");
  }

  return await response.json();
}

export async function updateGrup(id, grup) {
  const token = Cookies.get("token");
  const response = await fetch(grupsURL + "/update/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(grup),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al actualizar el grupo");
  }

  return await response.json();
}

export async function deleteGrup(id) {
  const token = Cookies.get('token');
  const response = await fetch(grupsURL + '/delete/' + id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al eliminar el grupo');
  }

  return await response.json();
}
