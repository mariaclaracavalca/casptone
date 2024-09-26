import React from 'react';
import './TestingSection.css'; 

const TestingSection = () => {
  return (
    <section className="testing-section">
      <div className="container">
        <h1>What is Software Testing?</h1>
        <p>
          Software testing is a crucial process in the development of applications.
          It involves the identification of bugs, ensuring the quality and reliability
          of software, and validating that it meets the specified requirements.
        </p>
        <img src="path_to_image_or_icon" alt="Software Testing" className="testing-image" />
      </div>
    </section>
  );
}

export default TestingSection;
