import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email ,password })
      });
  
      console.log(response);  // <--- Controlla la risposta qui
      const data = await response.json();
      if (response.ok) {
        setMessage('Registrazione completata con successo!');
      } else {
        setMessage(data.message || 'Errore nella registrazione');
      }
    } catch (error) {
      console.error(error);  // <--- Controlla l'errore nel client
      setMessage('Errore nella connessione al server');
    }
  };
  

  return (
    <div>
      <h2>Registrati</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrati</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;