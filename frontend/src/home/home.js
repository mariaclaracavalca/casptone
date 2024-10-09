import React from 'react';
import TestingSection from '../testingSection/TestingSection';
import BddTddSection from '../bddTddSection/BddTddSection';
import AutomationSection from '../automationSection/AutomationSection';
import CommunitySection from '../communitySection/CommunitySection';
import QuizSection from '../quiz/QuizSection';

// Funzione per verificare se l'utente è autenticato
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Verifica se il token è presente
};

const Home = () => {
  return (
    <div>

      {/* Mostra QuizSection solo se l'utente è loggato */}
      {isAuthenticated() && <QuizSection />}
      
      <TestingSection />
      <BddTddSection />
      <AutomationSection />
      <CommunitySection />
    </div>
  );
}

export default Home;
