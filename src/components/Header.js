import React, { useState } from "react";
import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUserContext } from "../contexts/UserContext";
import HomeIcon from "../resources/images/bannerVidal.png";
import { ReactComponent as ProfileIcon } from "../resources/icons/profile.svg";
import { ReactComponent as ActaIcon } from "../resources/icons/acta.svg";
import { ReactComponent as AcordIcon } from "../resources/icons/acord.svg";
import { ReactComponent as GrupIcon } from "../resources/icons/grup.svg";
import { ReactComponent as ConvocatoriaIcon } from "../resources/icons/convocatoria.svg";
import { ReactComponent as PlantillaIcon } from "../resources/icons/plantilla.svg";

export default function Header() {
  const { userName, setUserName, userRole, setUserRole, userId, setUserId } = useUserContext();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleProfileDropdownClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userRole");
    Cookies.remove("userName");
    Cookies.remove("userId");
    setUserName("");
    setUserRole("");
    setUserId("");
    navigate("/");
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <span className="icon">
                <img src={HomeIcon} alt="Home" />
              </span>
            </Link>
          </li>
          {userId && (userRole === "administrador" || userRole === "professor" || userRole === "directiu") && (
            <>
              {(userRole === "administrador" || userRole === "directiu") && (
                <li className="admin-link">
                  <span className="icon">
                    <PlantillaIcon />
                  </span>
                  <Link to="/plantillas">Plantilles</Link>
                </li>
              )}
              <li className="admin-link">
                <span className="icon">
                  <GrupIcon />
                </span>
                <Link to="/grups">Grups</Link>
              </li>
              <li className="admin-link">
                <span className="icon">
                  <ConvocatoriaIcon />
                </span>
                <Link to="/convocatorias">Convocatòries</Link>
              </li>
              <li className="admin-link">
                <span className="icon">
                  <ActaIcon />
                </span>
                <Link to="/actas">Actes</Link>
              </li>
              <li className="admin-link">
                <span className="icon">
                  <AcordIcon />
                </span>
                <Link to="/acords">Acords</Link>
              </li>
            </>
          )}
          {!userName && (
            <li>
              <Link to="/auth/login">
                Iniciar sessió
              </Link>
            </li>
          )}
          {userName && (
            <li className="dropdown" onClick={handleProfileDropdownClick}>
              <span>
                <span className="icon">
                  <ProfileIcon />
                </span>
                <span className="text">{userName} ▼</span>
              </span>
              {isProfileDropdownOpen && (
                <ul className="dropdown-menu">
                  {(userRole === "administrador") && (
                    <li>
                      <Link to="/admin/panel">Panell d'administrador</Link>
                    </li>
                  )}
                  <li>
                    <Link to={`/user/edit/${userId}`}>Perfil</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Sortir</button>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}              
