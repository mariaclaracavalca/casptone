import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; // Per stili personalizzati, inclusa l'icona ad occhio

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.name); // Salva il nome utente nel localStorage
        localStorage.setItem('userEmail', email);
        setMessage('Login avvenuto con successo.');
        navigate('/home');
      } else {
        setMessage(data.message || 'Errore nel login');
      }
    } catch (error) {
      setMessage('Errore nella connessione al server - login.');
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
        localStorage.setItem('username', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userId', data.userId); 
        setMessage('Registrazione completata con successo!');
      } else {
        setMessage(data.message || 'Errore nella registrazione');
      }
    } catch (error) {
      setMessage('Errore nella connessione al server - register.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="auth-page-box p-4 shadow-lg bg-white rounded">
        <h1 className="mb-4 text-black">{isLogin ? "Login" : "Register"}</h1>
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
              className="form-control mb-3"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control mb-3"
          />
          <div className="auth-page-password-wrapper position-relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
            <span
              className={`auth-page-eye-icon ${showPassword ? "show" : ""}`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer", position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}
            ></span>
          </div>
          <button type="submit" className="button-login btn btn-outline-ligh w-100">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {message && <div className="text-danger mt-3">{message}</div>}

        <div className="mt-1 text-black">
          {isLogin ? "You do not have an account?" : "You already have an account?"}
          <button onClick={toggleForm} className="btn btn-link">
            {isLogin ? "Register here" : "Login here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
