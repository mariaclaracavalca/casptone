import React from "react";
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from '../assets/logo.png';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  
  const username = localStorage.getItem('username');
  const isAuthenticated = !!localStorage.getItem('token'); // Controllo se c'è un token salvato


  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" className="navbar-logo" /> {/* Logo */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* Mostra "Quiz" solo se l'utente è autenticato */}
            {isAuthenticated && (
              <Nav.Link className="quiz-button" href="/home#styled-quiz-section">Quiz</Nav.Link>
            )}
            <Nav.Link href="/home#testing-section">What is Testing</Nav.Link>
            <Nav.Link href="/home#bdd-tdd-section">BDD & TDD</Nav.Link>
            <Nav.Link href="/home#automation-section">Testing Automation</Nav.Link>
            <Nav.Link href="/home#community-section">Community</Nav.Link>
          </Nav>
          <Nav>
            {username ? (
              <Button className="button-login" variant="outline-light" onClick={() => navigate('/logout')}>
                {username}
              </Button>
            ) : (
              <Button className="button-login" variant="outline-light" onClick={handleLoginClick}>
                Accedi
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
