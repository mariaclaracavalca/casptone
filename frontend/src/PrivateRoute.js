import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente per proteggere le rotte private
const PrivateRoute = ({ element: Element }) => {
  return isAuthenticated() ? <Element /> : <Navigate to="/login" />;
};

const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Verifica se il token è presente
};

export default PrivateRoute;
