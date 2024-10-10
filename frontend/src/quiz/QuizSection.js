import React, { useState, useEffect } from 'react';
import './QuizSection.css'; 

const StyledQuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [userResponses, setUserResponses] = useState([]); // Traccia le risposte dell'utente

  const questions = [
    {
      questionText: "What does BDD stand for?",
      answerOptions: [
        { answerText: "Behavior Driven Development", isCorrect: true },
        { answerText: "Basic Development Design", isCorrect: false },
        { answerText: "Backend Driven Deployment", isCorrect: false },
        { answerText: "Browser Development Domain", isCorrect: false }
      ]
    },
    {
      questionText: "Which tool is commonly used for automated browser testing?",
      answerOptions: [
        { answerText: "Selenium", isCorrect: true },
        { answerText: "Photoshop", isCorrect: false },
        { answerText: "WordPress", isCorrect: false },
        { answerText: "AutoCAD", isCorrect: false }
      ]
    },
    {
      questionText: "What does TDD stand for?",
      answerOptions: [
        { answerText: "Test Driven Development", isCorrect: true },
        { answerText: "Tool Driven Development", isCorrect: false },
        { answerText: "Team Driven Design", isCorrect: false },
        { answerText: "Technical Driven Deployment", isCorrect: false }
      ]
    },
    {
      questionText: "Which of the following is a popular testing framework for JavaScript?",
      answerOptions: [
        { answerText: "Jest", isCorrect: true },
        { answerText: "Bootstrap", isCorrect: false },
        { answerText: "Django", isCorrect: false },
        { answerText: "Laravel", isCorrect: false }
      ]
    },
    {
      questionText: "Which language is commonly used for writing automation scripts?",
      answerOptions: [
        { answerText: "Python", isCorrect: true },
        { answerText: "HTML", isCorrect: false },
        { answerText: "CSS", isCorrect: false },
        { answerText: "PHP", isCorrect: false }
      ]
    },
    {
      questionText: "Which testing tool is associated with behavior-driven development?",
      answerOptions: [
        { answerText: "Cucumber", isCorrect: true },
        { answerText: "Photoshop", isCorrect: false },
        { answerText: "JIRA", isCorrect: false },
        { answerText: "Jenkins", isCorrect: false }
      ]
    },
    {
      questionText: "Which of the following is a popular testing framework for Python?",
      answerOptions: [
        { answerText: "PyTest", isCorrect: true },
        { answerText: "React", isCorrect: false },
        { answerText: "Vue.js", isCorrect: false },
        { answerText: "Angular", isCorrect: false }
      ]
    },
    {
      questionText: "What type of testing is used to verify that a new change has not broken existing functionality?",
      answerOptions: [
        { answerText: "Regression Testing", isCorrect: true },
        { answerText: "Integration Testing", isCorrect: false },
        { answerText: "Unit Testing", isCorrect: false },
        { answerText: "Exploratory Testing", isCorrect: false }
      ]
    },
    {
      questionText: "What is the first step in the Test Driven Development (TDD) process?",
      answerOptions: [
        { answerText: "Write a failing test", isCorrect: true },
        { answerText: "Write production code", isCorrect: false },
        { answerText: "Refactor code", isCorrect: false },
        { answerText: "Write documentation", isCorrect: false }
      ]
    },
    {
      questionText: "In Cypress, which command is used to visit a specific URL in the browser?",
      answerOptions: [
        { answerText: "cy.visit()", isCorrect: true },
        { answerText: "cy.goTo()", isCorrect: false },
        { answerText: "cy.open()", isCorrect: false },
        { answerText: "cy.load()", isCorrect: false }
      ]
    }
  ];

  useEffect(() => {
    shuffleOptions();
  }, [currentQuestion]); // verificare come gestire il cambiamento della domanda

  const shuffleOptions = () => {
    const shuffled = [...questions[currentQuestion].answerOptions].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  };

  const handleAnswerOptionClick = (isCorrect, answerText) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    // Aggiorna la risposta dell'utente
    const newResponse = {
      question: questions[currentQuestion].questionText,
      answer: answerText,
      isCorrect: isCorrect
    };

    setUserResponses([...userResponses, newResponse]);
    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswers(false);
    } else {
      setShowScore(true);
      submitQuizResults(); // Invia i risultati al backend
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowAnswers(false);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setShowAnswers(false);
    setUserResponses([]); // Resetta le risposte
  };

  // Funzione per inviare i risultati al backend
  const submitQuizResults = async () => {
    const quizData = {
      score: score,
      totalQuestions: questions.length,
      responses: userResponses
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/quiz/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(quizData)
      });

      if (response.ok) {
        console.log('Quiz results successfully submitted.');
      } else {
        console.error('Failed to submit quiz results.');
      }
    } catch (error) {
      console.error('Error submitting quiz results:', error);
    }
  };

  return (
    <section id="styled-quiz-section" className="styled-quiz-section">
      <div className="quiz-container">
        <h2>Test Your Software Testing Knowledge</h2>

        {showScore ? (
          <div className="quiz-score-section">
            You scored {score} out of {questions.length}
            <button onClick={restartQuiz} className="restart-quiz-button">Restart Quiz</button>
          </div>
        ) : (
          <div className="quiz-question-section">
            <div className="quiz-question-text">
              {questions[currentQuestion].questionText}
            </div>
            <div className="quiz-answer-section">
              {shuffledOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOptionClick(option.isCorrect, option.answerText)}
                  className={showAnswers ? (option.isCorrect ? 'quiz-correct-answer' : 'quiz-incorrect-answer') : ''}
                >
                  {option.answerText} {showAnswers && (option.isCorrect ? "✓" : "✕")}
                </button>
              ))}
            </div>

            <div className="quiz-navigation-buttons">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className="quiz-prev-button"
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={!showAnswers}
                className="quiz-next-button"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StyledQuizSection;
