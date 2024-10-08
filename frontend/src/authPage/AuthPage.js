import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; 

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isEdit, setIsEdit] = useState(false); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      const storedEmail = localStorage.getItem('userEmail');
      const storedName = localStorage.getItem('username');
      if (storedEmail) setEmail(storedEmail);
      if (storedName) setName(storedName);
    }
  }, [isEdit]);

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

  const handleEdit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
  
    console.log("Token:", token); // Aggiungi questo log per il debug
  
    if (!token || !userId) {
      setMessage('Token mancante o scaduto. Si prega di accedere nuovamente.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('username', name);
        localStorage.setItem('userEmail', email);
        setMessage('Profilo aggiornato con successo.');
      } else {
        setMessage(data.message || 'Errore nell\'aggiornamento del profilo.');
      }
    } catch (error) {
      setMessage('Errore nella connessione al server edit.');
    }
  };
  
  
  return (
    <div className="auth-page-container">
      <div className="auth-page-box">
        <h1>{isEdit ? "Modifica Profilo" : (isLogin ? "Accedi" : "Registrati")}</h1>
        <form onSubmit={isEdit ? handleEdit : (isLogin ? handleLogin : handleRegister)}>
          {!isLogin && !isEdit && (
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
              className="auth-page-input-field"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-page-input-field"
          />
          <div className="auth-page-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!isEdit} 
              className="auth-page-input-field auth-page-password-field"
            />
            <span
              className={`auth-page-eye-icon ${showPassword ? "show" : ""}`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ pointerEvents: "auto" }}
            ></span>
          </div>
          <button type="submit" className="auth-page-button">
            {isEdit ? "Salva Modifiche" : (isLogin ? "Accedi" : "Registrati")}
          </button>
        </form>

        {message && <p className="auth-page-message">{message}</p>}

        {!isEdit && (
          <p className="auth-page-toggle-text">
            {isLogin ? "Non hai un account?" : "Hai già un account?"}
            <button onClick={toggleForm} className="auth-page-toggle-button">
              {isLogin ? "Registrati qui" : "Accedi qui"}
            </button>
          </p>
        )}

        {isLogin && !isEdit && (
          <p className="auth-page-toggle-text">
            Vuoi modificare il profilo?
            <button onClick={() => setIsEdit(true)} className="auth-page-toggle-button">
              Modifica qui
            </button>
          </p>
        )}

        {isEdit && (
          <p className="auth-page-toggle-text">
            <button onClick={() => { setIsEdit(false); setIsLogin(true); }} className="auth-page-toggle-button">
              Indietro
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
