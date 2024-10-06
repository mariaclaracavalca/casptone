import React from "react";
import "./BddTddSection.css";
import bddIcon from "../assets/bdd-icon.png";
import tddIcon from "../assets/tdd-icon.png";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const BddTddSection = () => {
  const bddCodeExample = `Feature: User login
    Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters valid credentials
    Then the user should be redirected to the dashboard`;

  const tddCodeExample = `// Test case for user login
    test('should log in user with correct credentials', () => {
    const user = login('username', 'password');
    expect(user).toBeDefined();
    expect(user.dashboard).toBeTruthy();
   });`;

  return (
    <section id="bdd-tdd-section" className="bdd-tdd-section">
      <div className="container">
        <h2>
          Behavior Driven Development (BDD) & Test Driven Development (TDD)
        </h2>
        <p>
          BDD and TDD are methodologies that emphasize writing tests before
          code, improving collaboration between developers, testers, and
          business stakeholders.
        </p>

        <div className="methods">
          <div className="method">
            <h3>BDD</h3>
            <p>
              Behavior Driven Development (BDD) focuses on the behavior of an
              application from the user's perspective. It uses scenarios written
              in plain language to define how the system should behave.
            </p>
            <img src={bddIcon} alt="BDD" />
            <h4>Example:</h4>
            <SyntaxHighlighter language="gherkin" style={docco}>
              {bddCodeExample}
            </SyntaxHighlighter>
          </div>

          <div className="method">
            <h3>TDD</h3>
            <p>
              Test Driven Development (TDD) is a technique where you write tests
              first, then implement the code to make those tests pass. This
              ensures the correctness of each small piece of functionality.
            </p>
            <img src={tddIcon} alt="TDD" />
            <h4>Example:</h4>
            <SyntaxHighlighter language="javascript" style={docco}>
              {tddCodeExample}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BddTddSection;
