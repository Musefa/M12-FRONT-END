import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RegisterUser from "../services/RegisterController";
import { useUserContext } from "../contexts/UserContext";
//import "../styles/RegisterPage.css";

export default function RegisterPage() {
    const [nom, setNom] = useState("");
    const [cognom, setCognom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setUserName, setUserRole } = useUserContext();
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          setError("Las contraseñas no coinciden");
          return;
        }
        try {
            const response = await RegisterUser({ nom, cognom, email, password });
            if (response && response.token) {
                setUserName(response.userData.nom);
                setUserRole(response.userData.role);
                navigate("/");
            } else {
                setError("Registration failed");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-page">
            <div className="register-div">
                <h1>REGISTRO</h1>
                <form onSubmit={handleRegister}>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={nom}
                        name="nom"
                        onChange={(e) => setNom(e.target.value)}
                    />
                    <label>Apellido</label>
                    <input
                        type="text"
                        value={cognom}
                        name="cognom"
                        onChange={(e) => setCognom(e.target.value)}
                    />
                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Confirmar contraseña</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit">
                        Registrarse
                    </button>
                    <p>¿Ya tienes cuenta? <Link to="/auth/login">Iniciar sesión</Link></p>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}
