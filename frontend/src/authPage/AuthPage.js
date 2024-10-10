import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; // Per stili personalizzati, inclusa l'icona ad occhio

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

  const handleEdit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
  
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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="auth-page-box p-4 shadow-lg bg-white rounded">
        <h1 className="mb-4 text-black">{isEdit ? "Edit Profile" : (isLogin ? "Login" : "Register")}</h1>
        <form onSubmit={isEdit ? handleEdit : (isLogin ? handleLogin : handleRegister)}>
          {!isLogin && !isEdit && (
            <input
              type="text"
              placeholder="Nome"
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
              required={!isEdit} 
              className="form-control"
            />
            <span
              className={`auth-page-eye-icon ${showPassword ? "show" : ""}`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer", position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}
            ></span>
          </div>
          <button type="submit" className="button-login btn btn-outline-ligh w-100">
            {isEdit ? "Save Changes" : (isLogin ? "Login" : "Register")}
          </button>
        </form>

        {message && <div className="text-danger mt-3">{message}</div>}

        {!isEdit && (
          <div className="mt-1 text-black">
            {isLogin ? "You do not have an account?" : "You already have an account?"}
            <button onClick={toggleForm} className="btn btn-link">
              {isLogin ? "Register here" : "Login here"}
            </button>
          </div>
        )}

        {isLogin && !isEdit && (
          <div className="mt-1 text-black">
            Do you want to edit the profile?
            <button onClick={() => setIsEdit(true)} className="btn btn-link">
            Edit here
            </button>
          </div>
        )}

        {isEdit && (
          <div className="mt-3 text-black">
            <button onClick={() => { setIsEdit(false); setIsLogin(true); }} className="btn btn-link">
            Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
