// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa 'useNavigate'
import Cookies from 'js-cookie';
import { useUserContext } from '../contexts/UserContext'

export default function Header() {
  const { userName, setUserName, userRole, setUserRole } = useUserContext();
  const navigate = useNavigate(); // Añade 'navigate'

  // Función de cierre de sesión
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userRole');
    Cookies.remove('userName');
    setUserName('');
    setUserRole('');
    navigate('/');
  };

  return (
    <header>
      <nav>
        <ul>
          {!userName && (
            <li>
              <Link to="/auth/login">Iniciar sesión</Link>
            </li>
          )}
          {userName && (
            <>
              <li>
                <span>{userName}</span>
                <ul>
                  {userRole === 'admin' && (
                    <li>
                      <Link to="/admin">Admin Dashboard</Link>
                    </li>
                  )}
                  {/* Agrega aquí más rutas según el rol */}
                  <li>
                    <button onClick={handleLogout}>Cerrar sesión</button> {/* Botón de cierre de sesión */}
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
