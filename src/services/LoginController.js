import Cookies from 'js-cookie';

const loginURL = "http://localhost:5000/auth/login";

export default async function LoginUser(credentials) {
  const response = await fetch(loginURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (response.ok) {
    try {
      const data = await response.json();
      // Guardar el token y el rol del usuario como cookies
      Cookies.set('token', data.token, { 
        expires: 1, 
        sameSite: 'none', 
        secure: true 
      });
      
      Cookies.set('userRole', data.userData.role, { 
        expires: 1, 
        sameSite: 'none', 
        secure: true 
      });
  
      Cookies.set('userName', data.userData.nom, { 
        expires: 1, 
        sameSite: 'none', 
        secure: true 
      });
      
      return data;
    } catch (e) {
      console.error("Error parsing JSON:", e);
      throw new Error("Unable to parse JSON data");
    }
  } else {
    let error;
    try {
      error = await response.json();
    } catch (e) {
      error = { message: response.statusText || "Error logging in" };
    }
    throw new Error(error.message);
  }
}
