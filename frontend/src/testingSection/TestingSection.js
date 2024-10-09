import React, { useState } from 'react';
import './TestingSection.css'; 
import testIcon from '../assets/test-oficial-icon.png';
import functionalIcon from '../assets/functionalIcon.png'; 
import automationIcon from '../assets/automationIcon.png'; 

const TestingSection = () => {
  const [isExpanded, setIsExpanded] = useState({
    functional: false,
    automation: false,
    integration: false
  });

  const toggleExpand = (section) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  return (
    <section id="testing-section" className="testing-section">
      <div className="container">
        <h1 className='section-title-text-color'>What is Software Testing?</h1>
        <p>
          Software testing is a crucial process in the development of applications.
          It involves identifying bugs, ensuring the quality and reliability of software,
          and validating that it meets specified requirements.
        </p>

        <div className="card-container">
          <div className="testing-card">
            <img src={functionalIcon} alt="Functional Testing" className="card-icon" />
            <h3 className='section-title-text-color'>Functional Testing</h3>
            <p>
              Verifies that the software behaves according to its specified functional requirements.
            </p>
            {isExpanded.functional && (
              <div className="extra-info">
                <p>
                  Functional testing includes tests like unit testing, smoke testing, sanity testing, and more.
                  It's generally done manually but can also be automated.
                </p>
              </div>
            )}
            <button
              className="toggle-button"
              onClick={() => toggleExpand('functional')}
            >
              {isExpanded.functional ? "Show Less" : "Read More"}
            </button>
          </div>

          <div className="testing-card">
            <img src={automationIcon} alt="Automation Testing" className="card-icon" />
            <h3 className='section-title-text-color'>Automation Testing</h3>
            <p>
              Automates repetitive tasks using tools like Selenium, Cypress, and more.
            </p>
            {isExpanded.automation && (
              <div className="extra-info">
                <p>
                  Automation testing tools include popular frameworks such as:
                  <ul>
                    <li>Selenium: Widely used for web applications</li>
                    <li>Cypress: Modern end-to-end testing framework</li>
                    <li>Playwright: For fast and reliable browser testing</li>
                    <li>JUnit, TestNG: Used for unit testing in Java</li>
                    <li>Appium: For automating mobile apps</li>
                  </ul>
                  Automation reduces the need for manual effort in regression testing and enhances accuracy.
                </p>
              </div>
            )}
            <button
              className="toggle-button"
              onClick={() => toggleExpand('automation')}
            >
              {isExpanded.automation ? "Show Less" : "Read More"}
            </button>
          </div>

          <div className="testing-card">
            <img src={testIcon} alt="Integration Testing" className="card-icon" />
            <h3 className='section-title-text-color'>Integration Testing</h3>
            <p>
              Ensures that various software modules work together as expected.
            </p>
            {isExpanded.integration && (
              <div className="extra-info">
                <p>
                  Integration testing focuses on verifying the communication between different software modules.
                  It helps in identifying issues like incorrect data passing between modules, and is often
                  performed after unit testing.
                  <br />
                  Tools commonly used for integration testing include:
                  <ul>
                    <li>Postman: For API testing</li>
                    <li>JUnit: For Java applications</li>
                    <li>PyTest: For Python-based applications</li>
                  </ul>
                </p>
              </div>
            )}
            <button
              className="toggle-button"
              onClick={() => toggleExpand('integration')}
            >
              {isExpanded.integration ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestingSection;
