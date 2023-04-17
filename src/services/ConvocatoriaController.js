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
