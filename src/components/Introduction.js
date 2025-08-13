import React from 'react';
import '../styles/Introduction.css';

const Introduction = () => {
  return (
    <section id="about-me" className="introduction">
      <div className="intro-text">
        <p>
          Hi! I'm a 3th-year Ph.D. student in the <a href="https://www.hanyang.ac.kr/web/" target="_blank" rel="noopener noreferrer">School of Artificial Intelligence</a> at <a href="https://www.hanyang.ac.kr/web/" target="_blank" rel="noopener noreferrer">Hanyang University</a>. I am advised by Prof. Kyungsik Han as part of the <a href="http://hcc.hanyang.ac.kr/" target="_blank" rel="noopener noreferrer">Human-Centered Computing Lab</a>.
        </p>
        <p>
          My research interests ...
        </p>
        
        <div className="research-interests">
          <p><strong>Research interests:</strong> Explainable Recommender System; AI Safety</p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
