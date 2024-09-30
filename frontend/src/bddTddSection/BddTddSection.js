import React from 'react';
import './BddTddSection.css'; 
import bddIcon from '../assets/bdd-icon.png';
import tddIcon from '../assets/tdd-icon.png';

const BddTddSection = () => {
  return (
    <section className="bdd-tdd-section">
      <div className="container">
        <h2>Behavior Driven Development (BDD) & Test Driven Development (TDD)</h2>
        <p>
          BDD and TDD are methodologies that emphasize writing tests before code, improving collaboration
          between developers, testers, and business stakeholders.
        </p>

        <div className="methods">
          <div className="method">
            <h3>BDD</h3>
            <p>
              Behavior Driven Development (BDD) focuses on the behavior of an application from the user's perspective.
              It uses scenarios written in plain language to define how the system should behave.
            </p>
            <img src={bddIcon} alt="BDD" />
          </div>

          <div className="method">
            <h3>TDD</h3>
            <p>
              Test Driven Development (TDD) is a technique where you write tests first, then implement the code
              to make those tests pass. This ensures the correctness of each small piece of functionality.
            </p>
            <img src={tddIcon} alt="TDD" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BddTddSection;
