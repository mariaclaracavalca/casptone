import React from 'react';
import TestingSection from '../testingSection/TestingSection';
import BddTddSection from '../bddTddSection/BddTddSection';
import AutomationSection from '../automationSection/AutomationSection';
import CommunitySection from '../communitySection/CommunitySection';

const Home = () => {
  return (
    <div>
      <TestingSection />
      <BddTddSection />
      <AutomationSection />
      <CommunitySection />
    </div>
  );
}

export default Home;
