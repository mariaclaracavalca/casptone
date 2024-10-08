import React from 'react';
import TestingSection from '../testingSection/TestingSection';
import BddTddSection from '../bddTddSection/BddTddSection';
import AutomationSection from '../automationSection/AutomationSection';
import CommunitySection from '../communitySection/CommunitySection';
import QuizSection from '../quiz/QuizSection';

const Home = () => {
  return (
    <div>
      <TestingSection />
      <BddTddSection />
      <AutomationSection />
      <CommunitySection />
      <QuizSection />
    </div>
  );
}

export default Home;
