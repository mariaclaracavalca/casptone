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

    // const fetchQuizResults = async () => {
    //     try {
    //       const token = localStorage.getItem('token');
    //       const response = await fetch('http://localhost:5000/api/quiz/results', {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${token}`
    //         }
    //       });
  
    //       if (response.ok) {
    //         const data = await response.json();
    //         setQuizResults(data);
    //       } else {
    //         const errorData = await response.json();
    //         setError(errorData.message || 'Errore nel recupero dei risultati.');
    //       }
    //     } catch (error) {
    //       setError('Errore del server. Riprova più tardi.');
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
  
    //   fetchQuizResults();



    // Simula il caricamento di dati mockati
    const mockQuizResults = [
      {
        _id: '3',
        date: '2024-01-01T12:34:56Z',
        score: 5,
        totalQuestions: 6,
        responses: [
          {
            question: "What does BDD stand for?",
            answer: "Behavior Driven Development",
            isCorrect: true
          },
          {
            question: "Which tool is commonly used for automated browser testing?",
            answer: "Selenium",
            isCorrect: true
          },
          {
            question: "What does TDD stand for?",
            answer: "Test Driven Development",
            isCorrect: true
          },
          {
            question: "Which of the following is a popular testing framework for JavaScript?",
            answer: "Jest",
            isCorrect: false
          },
          {
            question: "Which language is commonly used for writing automation scripts?",
            answer: "Python",
            isCorrect: true
          },
          {
            question: "Which testing tool is associated with behavior-driven development?",
            answer: "Cucumber",
            isCorrect: true
          }
        ]
      },
      {
        _id: '5',
        date: '2024-01-01T12:34:56Z',
        score: 5,
        totalQuestions: 6,
        responses: [
          {
            question: "What does BDD stand for?",
            answer: "Behavior Driven Development",
            isCorrect: true
          },
          {
            question: "Which tool is commonly used for automated browser testing?",
            answer: "Selenium",
            isCorrect: true
          },
          {
            question: "What does TDD stand for?",
            answer: "Test Driven Development",
            isCorrect: true
          },
          {
            question: "Which of the following is a popular testing framework for JavaScript?",
            answer: "Jest",
            isCorrect: false
          },
          {
            question: "Which language is commonly used for writing automation scripts?",
            answer: "Python",
            isCorrect: true
          },
          {
            question: "Which testing tool is associated with behavior-driven development?",
            answer: "Cucumber",
            isCorrect: true
          }
        ]
      },
      {
        _id: '1',
        date: '2024-01-01T12:34:56Z',
        score: 5,
        totalQuestions: 6,
        responses: [
          {
            question: "What does BDD stand for?",
            answer: "Behavior Driven Development",
            isCorrect: true
          },
          {
            question: "Which tool is commonly used for automated browser testing?",
            answer: "Selenium",
            isCorrect: true
          },
          {
            question: "What does TDD stand for?",
            answer: "Test Driven Development",
            isCorrect: true
          },
          {
            question: "Which of the following is a popular testing framework for JavaScript?",
            answer: "Jest",
            isCorrect: false
          },
          {
            question: "Which language is commonly used for writing automation scripts?",
            answer: "Python",
            isCorrect: true
          },
          {
            question: "Which testing tool is associated with behavior-driven development?",
            answer: "Cucumber",
            isCorrect: true
          }
        ]
      }
    ];

    setTimeout(() => {
      setQuizResults(mockQuizResults); // Imposta i dati mockati
      setLoading(false); // Termina il caricamento
    }, 1000); // Simula il tempo di caricamento
  }, []);

const handleDelete = (quizResultId) => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch(`http://localhost:5000/api/quiz/results/${quizResultId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.ok) {
//         setQuizResults(quizResults.filter(result => result._id !== quizResultId)); // Aggiorna lo stato
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Errore durante l\'eliminazione del risultato.');
//       }
//     } catch (error) {
//       setError('Errore del server. Riprova più tardi.');
//     }
//   };
  
    setQuizResults(quizResults.filter(result => result._id !== quizResultId));
  };

  const toggleExpand = (quizId) => {
    // Se il quiz è già espanso, chiudilo, altrimenti espandilo
    setExpandedQuiz(expandedQuiz === quizId ? null : quizId);
  };


  const handleRetry = () => {
    navigate('/quiz'); // Permette di rifare il quiz
  };

  return (
    <div className="quiz-results-container container mt-4">
      <h2 className="mb-4">Risultati dei Quiz</h2>
      {loading ? (
        <p>Caricamento...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : quizResults.length === 0 ? (
        <p>Non hai ancora completato nessun quiz.</p>
      ) : (
        quizResults.map((result) => (
          <div key={result._id} className="quiz-result mb-3">
            <div className="quiz-result-header d-flex justify-content-between text-black" onClick={() => toggleExpand(result._id)} style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#f1f1f1', borderRadius: '5px' }}>
              <div>
                Quiz del {new Date(result.date).toLocaleDateString()}
              </div>
              <div>
                Punteggio: {result.score} su {result.totalQuestions} &nbsp;
                <button onClick={() => handleDelete(result._id)}>
                  <img src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png" alt="Elimina" width={20} />
                </button>
              </div>
            </div>

            {/* Se il quiz è espanso, mostra le risposte */}
            {expandedQuiz === result._id && (
              <div className="quiz-result-body mt-3" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <ul>
                  {result.responses.map((response, i) => (
                    <li key={i} style={{ marginBottom: '10px' }}>
                      <strong>Domanda:</strong> {response.question} <br />
                      <strong>Risposta:</strong> {response.answer} <br />
                      <strong>Corretta:</strong> {response.isCorrect ? 'Sì' : 'No'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
      <p>
        <button onClick={handleRetry} className="button-login btn btn-outline-light">Rifai il Quiz</button>
      </p>
    </div>
  );
};

export default QuizResults;
