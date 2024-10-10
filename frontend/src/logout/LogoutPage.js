import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutPage.css';

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('username'); 
    navigate('/login'); 
  };

  return (
    <div className="logout-container">
      <div className="logout-box">
        <h1>Sei sicuro di voler disconnetterti?</h1>
        <button className="button-login btn btn-outline-light" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default LogoutPage;
