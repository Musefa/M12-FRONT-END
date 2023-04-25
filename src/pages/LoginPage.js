import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginUser from "../services/LoginController";
import { useUserContext } from "../contexts/UserContext";
import "../styles/LoginPage.css";
import { loadRecaptcha, removeRecaptcha } from "../services/Recaptcha";

export default function LoginPage() {
  const recaptchaKey = "6LcK1HQlAAAAAHwo4Ii71XaUQx6JUsoCkCa7mgc_";
  const recaptchaRef = useRef(null);
  const [recaptchaPassed, setRecaptchaPassed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(null);
  const [passwordIsValid, setPasswordIsValid] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserName, setUserRole } = useUserContext();
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");


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

  const validateEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (regex.test(email)) {
      setEmailIsValid(true);
      setEmailErrorMessage("");
    } else {
      setEmailIsValid(false);
      setEmailErrorMessage("Correu electrònic no vàlid.");
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
    if (regex.test(password)) {
      setPasswordIsValid(true);
      setPasswordErrorMessage("");
    } else {
      setPasswordIsValid(false);
      setPasswordErrorMessage(
        "La contrasenya ha de tenir almenys 8 caràcters, incloent almenys una majúscula, una minúscula, un número i un caràcter especial com @, $, !, %, *, ?, o &."
      );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await LoginUser({ email, password });
      if (response && response.token) {
        setUserName(response.userData.nom);
        setUserRole(response.userData.role);
        navigate("/");
      } else {
        setError("Inici de sessió fallit.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-div">
        <h1>INICI DE SESSIÓ</h1>
        <form onSubmit={handleLogin}>
          <label>Correu electrònic</label>
          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
            {emailIsValid !== null && (
              <span className={emailIsValid ? "valid" : "invalid"}>
                {emailIsValid ? "✔" : "✖"}
              </span>
            )}
          </div>
          {emailErrorMessage && (
            <div className="error-popup1">
              {emailErrorMessage}
              <span className="close-btn" onClick={() => setEmailErrorMessage("")}>
                ×
              </span>
            </div>
          )}
          <label>Contrasenya</label>
          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
            />
            {passwordIsValid !== null && (
              <span className={passwordIsValid ? "valid" : "invalid"}>
                {passwordIsValid ? "✔" : "✖"}
              </span>
            )}
          </div>
          {passwordErrorMessage && (
            <div className="error-popup2">
              {passwordErrorMessage}
              <span
                className="close-btn"
                onClick={() => setPasswordErrorMessage("")}
              >
                ×
              </span>
            </div>
          )}
          <div className="captcha-container">
            <div id="g-recaptcha" ref={recaptchaRef}></div>
          </div>
          <button type="submit" disabled={!emailIsValid || !passwordIsValid || !recaptchaPassed}>
            Iniciar sessió
          </button>
          <p>No tens compte? <Link to="/auth/register">Registra't</Link></p>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>

  );
}
