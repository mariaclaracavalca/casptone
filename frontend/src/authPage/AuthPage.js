import React, { useState } from 'react';
import './AuthPage.css'; // Assicurati di creare un file CSS separato

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin); 
    setMessage(''); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Login avvenuto con successo.');
      } else {
        setMessage(data.message || 'Errore nel login');
      }
    } catch (error) {
      setMessage('Errore nella connessione al server');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Registrazione completata con successo!');
      } else {
        setMessage(data.message || 'Errore nella registrazione');
      }
    } catch (error) {
      setMessage('Errore nella connessione al server');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>{isLogin ? 'Accedi' : 'Registrati'}</h1>
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
              className="input-field"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="auth-button">
            {isLogin ? 'Accedi' : 'Registrati'}
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="toggle-text">
          {isLogin ? 'Non hai un account?' : 'Hai già un account?'}
          <button onClick={toggleForm} className="toggle-button">
            {isLogin ? 'Registrati qui' : 'Accedi qui'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
