import React from "react";
import { useNavigate } from 'react-router-dom'; 
import logo from '../assets/logo.png'; 
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate(); 
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
          <li><a href="/courses">Cos'è Test</a></li>
          <li><a href="/membership">BDD e TDD</a></li>
          <li><a href="/tutorials">Testing Automation</a></li>
          <li><a href="/community">Community</a></li>
        </ul>
        
        <div className="button-login">
          <button onClick={handleLoginClick}>Accedi</button> 
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
