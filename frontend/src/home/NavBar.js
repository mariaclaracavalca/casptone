import React from "react";
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from '../assets/logo.png';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  
  const username = localStorage.getItem('username');

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
            <Nav.Link href="#testing-section">What is Testing</Nav.Link>
            <Nav.Link href="#bdd-tdd-section">BDD & TDD</Nav.Link>
            <Nav.Link href="#automation-section">Testing Automation</Nav.Link>
            <Nav.Link href="#community-section">Community</Nav.Link>
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
