import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import RegisterUser from "../services/RegisterController";
import { useUserContext } from "../contexts/UserContext";
import "../styles/RegisterPage.css";
import { loadRecaptcha, removeRecaptcha } from "../services/Recaptcha";

export default function RegisterPage() {
    const recaptchaKey = "6LcK1HQlAAAAAHwo4Ii71XaUQx6JUsoCkCa7mgc_";
    const recaptchaRef = useRef(null);
    const [recaptchaPassed, setRecaptchaPassed] = useState(false);
    const [nom, setNom] = useState("");
    const [cognom, setCognom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setUserName, setUserRole } = useUserContext();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nomIsValid, setNomIsValid] = useState(null);
    const [cognomIsValid, setCognomIsValid] = useState(null);
    const [emailIsValid, setEmailIsValid] = useState(null);
    const [passwordIsValid, setPasswordIsValid] = useState(null);
    const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(null);

    useEffect(() => {
        const renderRecaptcha = () => {
            if (recaptchaRef.current) {
                window.grecaptcha.render(recaptchaRef.current, {
                    sitekey: recaptchaKey,
                    callback: () => setRecaptchaPassed(true),
                });
            }
        };

        loadRecaptcha(renderRecaptcha);

        return () => {
            removeRecaptcha();
        };
    }, []);

    const validateNom = (nom) => {
        const regex = /^[a-zA-Z]{3,}$/;
        setNomIsValid(regex.test(nom));
    };

    const validateCognom = (cognom) => {
        const regex = /^[a-zA-Z]{3,}$/;
        setCognomIsValid(regex.test(cognom));
    };

    const validateEmail = (email) => {
        const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        setEmailIsValid(regex.test(email));
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
        setPasswordIsValid(regex.test(password));
    };

    const validateConfirmPassword = (confirmPassword) => {
        setConfirmPasswordIsValid(password === confirmPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Les contrasenyes no coincideixen.");
            return;
        }
        try {
            const response = await RegisterUser({ nom, cognom, email, password });
            if (response && response.token) {
                setUserName(response.userData.nom);
                setUserRole(response.userData.role);
                navigate("/");
            } else {
                setError("Registre fallit.");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-page">
            <div className="register-div">
                <h1>Registre</h1>
                <form onSubmit={handleRegister}>
                    <label>Nom</label>
                    <input
                        type="text"
                        value={nom}
                        name="nom"
                        onChange={(e) => {
                            setNom(e.target.value);
                            validateNom(e.target.value);
                        }}
                    />
                    <label>Cognom</label>
                    <input
                        type="text"
                        value={cognom}
                        name="cognom"
                        onChange={(e) => {
                            setCognom(e.target.value);
                            validateCognom(e.target.value);
                        }}
                    />
                    <label>Correu electrònic</label>
                    <input
                        type="email"
                        value={email}
                        name="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail(e.target.value);
                        }}
                    />
                    <label>Contrasenya</label>
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                    />
                    <label>Confirmar contrasenya</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            validateConfirmPassword(e.target.value);
                        }}
                    />
                    <div className="captcha-container">
                        <div id="g-recaptcha" ref={recaptchaRef}></div>
                    </div>
                    <button
                        type="submit"
                        disabled={
                            !nomIsValid ||
                            !cognomIsValid ||
                            !emailIsValid ||
                            !passwordIsValid ||
                            !confirmPasswordIsValid ||
                            !recaptchaPassed
                        }
                    >
                        Registrar-se
                    </button>
                    <p>Ja tens compte? <Link className="login-btn" to="/auth/login">Iniciar sessió</Link></p>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}    