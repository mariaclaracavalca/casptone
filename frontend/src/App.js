import React from 'react';
import Register from './register/Register';
import Login from './login/Login';
import UserList from './user/UserList';

const App = () => {
  return (
    <div>
      <h1>Creato per test</h1>
      <Register />
      <Login />
      <UserList />
    </div>
  );
};

export default App;
