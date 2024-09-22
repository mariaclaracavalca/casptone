import React from "react";
import "./Footer.css";
import { FaTwitter, FaFacebook, FaYoutube, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-links">
                    <div className="footer-column">
                        <h3>TEST</h3>
                        <ul>
                            <li><a href="/courses">All </a></li>
                            <li><a href="/academind-pro"> Pro</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>OTHER </h3>
                        <ul>
                            <li><a href="/tutorials">Tutorial </a></li>
                            <li><a href="/podcast">Podcast</a></li>
                            <li><a href="/community">EpicTest Community</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-newsletter">
                    <h3>SUBSCRIBE TO  NEWSLETTER</h3>
                    <p> articles & more</p>
                    <form>
                        <input type="email" placeholder="Enter your email address" />
                        <button type="submit">Register</button>
                    </form>
                    <p className="privacy-notice">
                        By registering, you confirm that you read & accepted our <a href="/privacy-policy">privacy policy</a>.
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© EpicTest GmbH. All rights reserved.</p>
                <ul className="social-links">
                    <li><a href="/impressum">Impressum</a></li>
                    <li><a href="/imprint">Imprint</a></li>
                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                </ul>
                <div className="social-icons">
                    <a href="https://twitter.com"><FaTwitter /></a>
                    <a href="https://facebook.com"><FaFacebook /></a>
                    <a href="https://youtube.com"><FaYoutube /></a>
                    <a href="https://github.com"><FaGithub /></a>
                    <a href="https://instagram.com"><FaInstagram /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
