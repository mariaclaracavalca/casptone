import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizResults.css'; 


const QuizResults = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/quiz/results', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setQuizResults(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Errore nel recupero dei risultati.');
        }
      } catch (error) {
        setError('Errore del server. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizResults();
  }, []);

  const handleDelete = async (quizResultId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/quiz/results/${quizResultId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setQuizResults(quizResults.filter(result => result._id !== quizResultId)); // Aggiorna lo stato
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Errore durante l\'eliminazione del risultato.');
      }
    } catch (error) {
      setError('Errore del server. Riprova più tardi.');
    }
  };

  const handleRetry = () => {
    navigate('/quiz'); // Permette di rifare il quiz
  };

  return (
    <div className="quiz-results-container">
      <h2>Risultati dei Quiz</h2>
      {loading ? (
        <p>Caricamento...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : quizResults.length === 0 ? (
        <p>Non hai ancora completato nessun quiz.</p>
      ) : (
        <div>
          {quizResults.map((result, index) => (
            <div key={index} className="quiz-result">
              <h3>Quiz del {new Date(result.date).toLocaleDateString()}</h3>
              <p>Punteggio: {result.score} su {result.totalQuestions}</p>
              <ul>
                {result.responses.map((response, i) => (
                  <li key={i}>
                    <strong>Domanda:</strong> {response.question} <br />
                    <strong>Risposta:</strong> {response.answer} <br />
                    <strong>Corretta:</strong> {response.isCorrect ? 'Sì' : 'No'}
                  </li>
                ))}
              </ul>

              {/* Aggiungiamo l'icona del cestino */}
              <button onClick={() => handleDelete(result._id)} className="delete-button">
                <img src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png" alt="Elimina" className="delete-icon" />
              </button>
            </div>
          ))}
        </div>
      )}
      <p>
        <button onClick={handleRetry} className="button-login btn btn-outline-light">Rifai il Quiz</button>
      </p>
    </div>
  );
};

export default QuizResults;
