import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('username'); 
    navigate('/login'); 
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Sei sicuro di voler disconnetterti?</h1>
        <button className="auth-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default LogoutPage;
