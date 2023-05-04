import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL;

const registerURL = `${API_URL}/auth/register`;

export default async function RegisterUser(userData) {
  const response = await fetch(registerURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    try {
      const data = await response.json();

      const { token, userData } = data;

      Cookies.set('token', data.token, { 
        expires: 23, 
        sameSite: 'none', 
        secure: true 
      });
      
      Cookies.set('userRole', data.userData.role, { 
        expires: 23, 
        sameSite: 'none', 
        secure: true 
      });
  
      Cookies.set('userName', data.userData.nom, { 
        expires: 23, 
        sameSite: 'none', 
        secure: true 
      });

      Cookies.set('userId', data.userData.userId, { 
        expires: 23, 
        sameSite: 'none', 
        secure: true 
      });
      
      return { token, userData };
    } catch (e) {
      console.error("Error de registro:", e);
      throw new Error("Error de registro");
    }
  } else {
    let error;
    try {
      error = await response.json();
    } catch (e) {
      error = { message: response.statusText || "Error registering" };
    }
    throw new Error(error.message);
  }
}
