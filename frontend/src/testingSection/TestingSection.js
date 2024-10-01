import React from 'react';
import './TestingSection.css'; 
import testIcon from '../assets/test-oficial-icon.png';

const TestingSection = () => {
  return (
    <section id="testing-section" className="testing-section">
      <div className="container">
        <h1>What is Software Testing?</h1>
        <p>
          Software testing is a crucial process in the development of applications.
          It involves the identification of bugs, ensuring the quality and reliability
          of software, and validating that it meets the specified requirements.
        </p>
        <img src={testIcon} alt="Software Testing" className="testing-image" />
      </div>
    </section>
  );
}

export default TestingSection;
