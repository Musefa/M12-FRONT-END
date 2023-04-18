import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL;

const loginURL = `${API_URL}/auth/login`;

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
      console.error("Error de autenticacion:", e);
      throw new Error("Error de autenticacion");
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
