import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>About EpicTest</h3>
          <p>EpicTest is a platform dedicated to test information with resources on TDD, BDD, test automation and more.</p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><a href="#testing-section">Documentation</a></li>
              <li><a href="#community-section">Community</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Support</h3>
            <ul>
              <li>FAQ</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-motto">
        <p>"Learning never exhausts the mind"</p>
      </div>

      <div className="footer-bottom">
        <p>© 2024 EpicTest. All rights reserved.</p>
        <ul className="legal-links">
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
