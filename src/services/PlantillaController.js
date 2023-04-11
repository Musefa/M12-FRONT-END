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
