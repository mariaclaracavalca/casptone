import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './navbar/NavBar';  
import AuthPage from './authPage/AuthPage'; 
// import Footer from './footer/Footer';


function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/login" element={<AuthPage />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
