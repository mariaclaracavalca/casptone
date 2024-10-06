import React, { useState } from "react";
import "./AutomationSection.css";

const AutomationSection = () => {
  const [activeTab, setActiveTab] = useState("selenium");

  const handleTabClick = (framework) => {
    setActiveTab(framework);
  };

  return (
    <section id="automation-section" className="automation-section">
      <div className="container">
        <h2>Testing Automation</h2>
        <p>
          Automated testing ensures that your application behaves as expected.
          Below are more complex examples of tests in different frameworks,
          showcasing their unique capabilities and syntax.
        </p>

        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "selenium" ? "active" : ""}`}
            onClick={() => handleTabClick("selenium")}
          >
            Selenium
          </button>
          <button
            className={`tab-button ${activeTab === "cypress" ? "active" : ""}`}
            onClick={() => handleTabClick("cypress")}
          >
            Cypress
          </button>
          <button
            className={`tab-button ${activeTab === "jest" ? "active" : ""}`}
            onClick={() => handleTabClick("jest")}
          >
            Jest
          </button>
        </div>

        <div className="framework-info">
          {activeTab === "selenium" && (
            <div className="framework-details">
              <h3>Selenium</h3>
              <div className="code-box">
                <pre>
                  {`const { Builder, By, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('https://example.com/login');
    await driver.findElement(By.name('username')).sendKeys('testUser');
    await driver.findElement(By.name('password')).sendKeys('password123');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlContains('/dashboard'), 5000);
    const welcomeText = await driver.findElement(By.css('h1')).getText();
    console.log('Welcome message:', welcomeText);
  } finally {
    await driver.quit();
  }
})();`}
                </pre>
                <p className="code-description">
                  This Selenium test performs a login simulation:
                  <ul>
                    <li>Opens the login page.</li>
                    <li>
                      Fills in the login form fields (username and password).
                    </li>
                    <li>
                      Submits the form and waits for redirection to the
                      dashboard.
                    </li>
                    <li>Verifies the welcome message on the dashboard.</li>
                  </ul>
                </p>
              </div>
            </div>
          )}

          {activeTab === "cypress" && (
            <div className="framework-details">
              <h3>Cypress</h3>
              <div className="code-box">
                <pre>
                  {`describe('Cypress Complex Test', () => {
  beforeEach(() => {
    cy.visit('https://example.com/login');
  });

  it('logs in and fetches user data', () => {
    cy.get('input[name="username"]').type('testUser');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.get('h1').should('contain', 'Welcome, testUser');
    cy.intercept('GET', '/api/user-data', {
      statusCode: 200,
      body: { userId: 1, name: 'Test User' },
    }).as('getUserData');
    cy.get('button#fetch-data').click();
    cy.wait('@getUserData').its('response.body').should('deep.equal', {
      userId: 1,
      name: 'Test User',
    });
  });
});`}
                </pre>
                <p className="code-description">
                  This Cypress test simulates a login and API interaction:
                  <ul>
                    <li>Visits the login page and fills in the form.</li>
                    <li>
                      Submits the form and checks if the dashboard URL is
                      correct.
                    </li>
                    <li>
                      Mocks an API request to fetch user data and validates the
                      response.
                    </li>
                  </ul>
                </p>
              </div>
            </div>
          )}

          {activeTab === "jest" && (
            <div className="framework-details">
              <h3>Jest</h3>
              <div className="code-box">
                <pre>
                  {`const fetchUserData = async (userId) => {
  const response = await fetch(\`https://api.example.com/users/\${userId}\`);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

jest.mock('node-fetch', () => jest.fn());
const { default: fetch } = require('node-fetch');
test('fetches user data successfully', async () => {
  fetch.mockResolvedValue({
    ok: true,
    json: async () => ({ userId: 1, name: 'Test User' }),
  });
  const userData = await fetchUserData(1);
  expect(userData).toEqual({ userId: 1, name: 'Test User' });
});
test('handles fetch failure', async () => {
  fetch.mockResolvedValue({
    ok: false,
  });
  await expect(fetchUserData(2)).rejects.toThrow('Network response was not ok');
});`}
                </pre>
                <p className="code-description">
                  This Jest test validates API call functionality:
                  <ul>
                    <li>Mocks a successful API call to fetch user data.</li>
                    <li>Validates the response structure and data.</li>
                    <li>
                      Mocks a failed API call and ensures proper error handling.
                    </li>
                  </ul>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AutomationSection;
