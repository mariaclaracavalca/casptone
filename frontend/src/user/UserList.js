import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:6000/api/users');
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          setError('Errore nel recuperare gli utenti');
        }
      } catch (error) {
        setError('Errore nella connessione al server');
      }
    };
    

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:6000/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId)); // Rimuovi utente dalla lista
      } else {
        setError('Errore durante l\'eliminazione dell\'utente');
      }
    } catch (error) {
      setError('Errore nella connessione al server');
    }
  };

  return (
    <div>
      <h2>Lista Utenti</h2>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - <button onClick={() => deleteUser(user._id)}>Elimina</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
