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
          showcasing their unique capabilities and use cases for web, mobile, end-to-end (E2E), regression, and API testing.
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
          <button
            className={`tab-button ${activeTab === "pytest" ? "active" : ""}`}
            onClick={() => handleTabClick("pytest")}
          >
            Pytest
          </button>
          <button
            className={`tab-button ${activeTab === "appium" ? "active" : ""}`}
            onClick={() => handleTabClick("appium")}
          >
            Appium (Mobile)
          </button>
        </div>

        <div className="framework-info">
          {/* Selenium */}
          {activeTab === "selenium" && (
            <div className="framework-details">
              <h3>Selenium</h3>
              <p>Selenium is used for automating web browser testing, focusing on end-to-end (E2E) testing and regression testing for web applications.</p>
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
                  This Selenium test performs an end-to-end test of a login flow for a web application:
                  <ul>
                    <li>Opens the login page.</li>
                    <li>Fills in the username and password fields.</li>
                    <li>Submits the form and waits for redirection to the dashboard.</li>
                    <li>Verifies the presence of a welcome message on the dashboard.</li>
                  </ul>
                  Selenium is ideal for cross-browser testing (Chrome, Firefox, Edge) and can be integrated into CI/CD pipelines for regression testing.
                </p>
              </div>
            </div>
          )}

          {/* Cypress */}
          {activeTab === "cypress" && (
            <div className="framework-details">
              <h3>Cypress</h3>
              <p>Cypress is designed for fast end-to-end (E2E) testing of modern web applications, and it also supports API testing.</p>
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
                  This Cypress test performs an end-to-end test and includes an API interaction:
                  <ul>
                    <li>Visits the login page and submits login credentials.</li>
                    <li>Verifies the URL after redirection to the dashboard.</li>
                    <li>Mocks an API request to fetch user data and validates the response.</li>
                  </ul>
                  Cypress is known for its speed, real-time reloading, and easy integration for both web and API tests. It's widely used for testing single-page applications (SPA).
                </p>
              </div>
            </div>
          )}

          {/* Jest */}
          {activeTab === "jest" && (
            <div className="framework-details">
              <h3>Jest</h3>
              <p>Jest is primarily used for unit and integration testing in JavaScript projects, but it can also be used for API testing.</p>
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
                  This Jest test demonstrates API testing with mocked data:
                  <ul>
                    <li>Mocks a successful API call to fetch user data.</li>
                    <li>Validates the structure and content of the response.</li>
                    <li>Mocks a failed API call and ensures proper error handling.</li>
                  </ul>
                  Jest is great for unit tests and supports mocking, which makes it ideal for testing isolated logic and API interactions.
                </p>
              </div>
            </div>
          )}

          {/* Pytest */}
          {activeTab === "pytest" && (
            <div className="framework-details">
              <h3>Pytest</h3>
              <p>Pytest is a Python testing framework used for unit tests, integration tests, and API testing. It's highly extensible with plugins like pytest-django or pytest-flask.</p>
              <div className="code-box">
                <pre>
                  {`import pytest
import requests

def fetch_user_data(user_id):
    response = requests.get(f'https://api.example.com/users/{user_id}')
    response.raise_for_status()
    return response.json()

def test_fetch_user_data_success(mocker):
    mock_response = mocker.patch('requests.get')
    mock_response.return_value.status_code = 200
    mock_response.return_value.json.return_value = {"userId": 1, "name": "Test User"}
    
    data = fetch_user_data(1)
    assert data == {"userId": 1, "name": "Test User"}

def test_fetch_user_data_failure(mocker):
    mock_response = mocker.patch('requests.get')
    mock_response.return_value.status_code = 404
    
    with pytest.raises(requests.exceptions.HTTPError):
        fetch_user_data(2)`}
                </pre>
                <p className="code-description">
                  This Pytest test verifies API calls and handles different responses:
                  <ul>
                    <li>Mocks a successful API call and verifies the data.</li>
                    <li>Mocks a failed API call and checks for error handling.</li>
                  </ul>
                  Pytest is known for its simplicity and scalability, making it suitable for testing everything from small units to large-scale API integrations.
                </p>
              </div>
            </div>
          )}

          {/* Appium */}
          {activeTab === "appium" && (
            <div className="framework-details">
              <h3>Appium (Mobile)</h3>
              <p>Appium is a cross-platform mobile automation framework used for end-to-end testing on Android and iOS apps. It supports both native and hybrid mobile applications.</p>
              <div className="code-box">
                <pre>
                  {`const wdio = require('webdriverio');

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "11.0",
    deviceName: "Android Emulator",
    app: "/path/to/app.apk",
    automationName: "UiAutomator2"
  }
};

(async () => {
  const client = await wdio.remote(opts);
  
  await client.$("~login").setValue("testUser");
  await client.$("~password").setValue("password123");
  await client.$("~submit").click();
  
  const welcomeText = await client.$("~welcomeMessage").getText();
  console.log("Welcome message:", welcomeText);
  
  await client.deleteSession();
})();`}
                </pre>
                <p className="code-description">
                  This Appium test performs an end-to-end test for a mobile app:
                  <ul>
                    <li>Launches the Android emulator and opens the mobile app.</li>
                    <li>Fills in the login form (username and password).</li>
                    <li>Submits the form and verifies the welcome message.</li>
                  </ul>
                  Appium supports testing for both Android and iOS, making it an excellent choice for mobile end-to-end and regression testing.
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
