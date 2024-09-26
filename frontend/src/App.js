import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './home/NavBar';  
import AuthPage from './authPage/AuthPage'; 
import UserList from './user/UserList'; 
import Home from './home/Home'; 
import Footer from './footer/Footer';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/user" element={<UserList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Home />
      <Footer />
    </Router>
  );
}

export default App;
