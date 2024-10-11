import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizResults.css'; 

const QuizResults = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [expandedQuiz, setExpandedQuiz] = useState(null); // Traccia quale quiz è espanso

  useEffect(() => {

    const fetchQuizResults = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:8080/api/quiz/results', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
  
          if (response.ok) {
            const data = await response.json();
            setQuizResults(data);
            setLoading(false); // Termina il caricamento
          } else {
            const errorData = await response.json();
            setError(errorData.message || 'Error in retrieving results.');
          }
        } catch (error) {
          setError('Server error. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchQuizResults();
  }, []);

  const toggleExpand = (quizId) => {
    // Se il quiz è già espanso, chiudilo, altrimenti espandilo
    setExpandedQuiz(expandedQuiz === quizId ? null : quizId);
  };


  const handleRetry = () => {
    navigate('/quiz'); // Permette di rifare il quiz
  };

  return (
    <div className="quiz-results-container container mt-4">
      <h2 className="mb-4">Quiz Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : quizResults.length === 0 ? (
        <p>You have not yet completed any quizzes.</p>
      ) : (
        quizResults.map((result) => (
          <div key={result._id} className="quiz-result mb-3">
            <div className="quiz-result-header d-flex justify-content-between text-black" onClick={() => toggleExpand(result._id)} style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#f1f1f1', borderRadius: '5px' }}>
              <div>
              Quiz of the {new Date(result.date).toLocaleDateString()}
              </div>
              <div>
              Score: {result.score} su {result.totalQuestions} &nbsp;
                {/* <button onClick={() => handleDelete(result._id)}>
                  <img src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png" alt="Elimina" width={20} />
                </button> */}
              </div>
            </div>

            {/* Se il quiz è espanso, mostra le risposte */}
            {expandedQuiz === result._id && (
              <div className="quiz-result-body mt-3" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <ul>
                  {result.responses.map((response, i) => (
                    <li key={i} style={{ marginBottom: '10px' }}>
                      <strong>Question:</strong> {response.question} <br />
                      <strong>Answer:</strong> {response.answer} <br />
                      <strong>Correct:</strong> {response.isCorrect ? 'Yes' : 'No'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
      <p>
        <button onClick={handleRetry} className="button-login btn btn-outline-light">Take the Quiz again</button>
      </p>
    </div>
  );
};

export default QuizResults;
