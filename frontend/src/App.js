import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './home/NavBar';  
import AuthPage from './authPage/AuthPage'; 
import UserList from './user/UserList'; 
import LogoutPage from './logout/LogoutPage';
import Home from './home/home'; // Correzione nome import con lettera maiuscola
import Footer from './footer/Footer'; 
import PrivateRoute from './PrivateRoute'; // Importa il componente PrivateRoute
import QuizResults from './quiz/QuizResults'; // Importa la pagina QuizResults
import './App.css'; // Assicurati che gli stili di App.css siano applicati

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="App-content"> {/* Sezione contenuto principale */}
          <Routes>
            {/* Rotte pubbliche */}
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<AuthPage />} />
            
            {/* Rotte protette */}
            <Route path="/user" element={<PrivateRoute element={UserList} />} />
            <Route path="/logout" element={<PrivateRoute element={LogoutPage} />} />
            <Route path="/quiz-results" element={<PrivateRoute element={QuizResults} />} />
            
            {/* Rotta di fallback */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
