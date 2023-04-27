import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState(''); // Añadir el estado userId

  useEffect(() => {
    const storedName = Cookies.get('userName');
    const storedRole = Cookies.get('userRole');
    const storedId = Cookies.get('userId'); // Leer el valor de la cookie userId

    if (storedName) {
      setUserName(storedName);
    }

    if (storedRole) {
      setUserRole(storedRole);
    }

    if (storedId) {
      setUserId(storedId); // Actualizar el estado userId si el valor está presente en las cookies
    }
  }, [userRole]); // Agrega userRole como dependencia del efecto

  return (
    <UserContext.Provider value={{ userName, setUserName, userRole, setUserRole, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
