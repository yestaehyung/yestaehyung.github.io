import React from 'react';
import '../styles/Introduction.css';

const Introduction = () => {
  return (
    <section id="about-me" className="introduction">
      <div className="intro-text">
        <p>
          Hi! I'm a 3rd-year Ph.D. student in the <a href="https://www.hanyang.ac.kr/web/" target="_blank" rel="noopener noreferrer">School of Artificial Intelligence</a> at <a href="https://www.hanyang.ac.kr/web/" target="_blank" rel="noopener noreferrer">Hanyang University</a>. I am advised by Prof. Kyungsik Han as part of the <a href="http://hcc.hanyang.ac.kr/" target="_blank" rel="noopener noreferrer">Human-Centered Computing Lab</a>.
        </p>
        <p>
          My research focuses on developing AI systems that understand and model human psychology for better personalization. I work on integrating psychological theories with Large Language Models (LLMs) to create more human-centered AI systems. My recent work includes the TRIPLE project, which combines the Theory of Planned Behavior with LLMs to enhance user profiling and personalization services.
        </p>
        
        <div className="research-interests">
          <p><strong>Research interests:</strong> Human-Centered AI, Personalization, LLM-based User Modeling, Psychological AI</p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
