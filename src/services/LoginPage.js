import React, { useState } from 'react';
import LoginController from '../components/LoginController';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await LoginController.loginUser({ email, password });
      if (response && response.token) {
        console.log(response);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log('Error logging in:', error.message);
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
    </div>
  );
}
