import Cookies from "js-cookie";

const grupsURL = "http://localhost:5000/grups";

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
  // ...
}

export async function updateGrup(id, grup) {
  // ...
}

export async function deleteGrup(id) {
  // ...
}
