import React from 'react';
import './CommunitySection.css';  

const CommunitySection = () => {
  return (
    <section id="community-section" className="community-section">
      <div className="container">
        <h2>Join the Software Testing Community</h2>
        <p>
          Being part of a community is essential for keeping up-to-date with the latest trends, tools, and best practices in software testing. Here are some resources where you can connect with other professionals:
        </p>

        <div className="community-cards">
          <div className="card">
            <h3 className='section-title-text-color'>Ministry of Testing</h3>
            <p>A global community of software testers with events, forums, and educational resources.</p>
            <a href="https://www.ministryoftesting.com" target="_blank" rel="noopener noreferrer">Visit Ministry of Testing</a>
          </div>

          <div className="card">
            <h3 className='section-title-text-color'>Stack Overflow</h3>
            <p>Join the software testing discussions on Stack Overflow, a huge platform for developers and testers.</p>
            <a href="https://stackoverflow.com/questions/tagged/testing" target="_blank" rel="noopener noreferrer">Visit Stack Overflow</a>
          </div>

          <div className="card">
            <h3 className='section-title-text-color'>Test Automation University</h3>
            <p>Learn about automation testing through free courses provided by Test Automation University.</p>
            <a href="https://testautomationu.applitools.com" target="_blank" rel="noopener noreferrer">Visit Test Automation University</a>
          </div>

          <div className="card">
            <h3 className='section-title-text-color'>Software Testing Blog</h3>
            <p>Explore articles, tutorials, and interviews with leading software testers around the world.</p>
            <a href="https://blog.testproject.io" target="_blank" rel="noopener noreferrer">Visit Blog</a>
          </div>

          <div className="card">
            <h3 className='section-title-text-color'>Testing YouTube Channels</h3>
            <p>Watch tutorials and talks from prominent figures in the software testing world on YouTube.</p>
            <a href="https://www.youtube.com/c/TestAutomationU" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
