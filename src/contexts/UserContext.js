import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedName = Cookies.get('userName');
    const storedRole = Cookies.get('userRole');

    if (storedName) {
      setUserName(storedName);
    }

    if (storedRole) {
      setUserRole(storedRole);
    }
  }, [userRole]); // Agrega userRole como dependencia del efecto

  return (
    <UserContext.Provider value={{ userName, setUserName, userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
