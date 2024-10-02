import React from "react";
import { useNavigate } from 'react-router-dom'; 
import logo from '../assets/logo.png'; 
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate(); 
  
  const username = localStorage.getItem('username');

  const handleLoginClick = () => {
    navigate("/login");  
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Logo" className="navbar-logo" /> 
          </a>
        </div>

        <ul className="nav-links">
          <li><a href="#testing-section">What is Testing</a></li>
          <li><a href="#bdd-tdd-section">BDD & TDD</a></li>
          <li><a href="#automation-section">Testing Automation</a></li>
          <li><a href="#community-section">Community</a></li>
        </ul>
        
        <div className="button-login">
          {username ? (
            <button onClick={() => navigate('/logout')}>{username}</button> 
          ) : (
            <button onClick={handleLoginClick}>Accedi</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
