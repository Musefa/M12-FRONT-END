import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginUser from '../components/LoginController';
import { useUserContext } from '../contexts/UserContext'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUserName, setUserRole } = useUserContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await LoginUser({ email, password });
      if (response && response.token) {
        setUserName(response.userData.nom); // Actualiza el nombre de usuario en el contexto
        setUserRole(response.userData.role); // Actualiza el rol del usuario en el contexto
        navigate('/');
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
