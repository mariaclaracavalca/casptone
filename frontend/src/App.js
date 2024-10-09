import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './home/NavBar';  
import AuthPage from './authPage/AuthPage'; 
import UserList from './user/UserList'; 
import LogoutPage from './logout/LogoutPage';
import Home from './home/home'; // Correzione nome import con lettera maiuscola
import Footer from './footer/Footer'; 
import './App.css'; // Assicurati che gli stili di App.css siano applicati

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="App-content"> {/* Sezione contenuto principale */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
