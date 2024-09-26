import React from 'react';
import './AutomationSection.css';  // Stile separato

const AutomationSection = () => {
  return (
    <section className="automation-section">
      <div className="container">
        <h2>Testing Automation</h2>
        <p>
          Automated testing involves using software tools to run predefined
          tests on your codebase. This helps in ensuring that your application
          behaves as expected without needing manual intervention.
        </p>

        <div className="automation-cards">
          <div className="card">
            <h3>Selenium</h3>
            <p>
              Selenium is a powerful tool for automating browsers, used for
              testing web applications.
            </p>
            <img src="path_to_selenium_image" alt="Selenium" />
          </div>

          <div className="card">
            <h3>Cypress</h3>
            <p>
              Cypress is a JavaScript-based end-to-end testing framework focused
              on making testing simple and reliable.
            </p>
            <img src="path_to_cypress_image" alt="Cypress" />
          </div>

          <div className="card">
            <h3>Jest</h3>
            <p>
              Jest is a delightful JavaScript testing framework with a focus on
              simplicity and support for large test suites.
            </p>
            <img src="path_to_jest_image" alt="Jest" />
          </div>
        </div>

        <div className="example-section">
          <h3>Example of a Simple Automated Test</h3>
          <pre>
            {`describe('Simple Test', () => {
            it('should visit the website', () => {
                cy.visit('https://example.com');
                cy.contains('Welcome').should('be.visible');
                });
            });`}
          </pre>
        </div>
      </div>
    </section>
  );
}

export default AutomationSection;
