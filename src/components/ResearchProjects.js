import React from 'react';
import '../styles/ResearchProjects.css';

const ResearchProjects = () => {
  return (
    <section className="research-projects">
      <h2>Research Projects</h2>
      <div className="projects-list">
        <div className="project">
          <div className="project-media">
            <img src="https://via.placeholder.com/400x280/667eea/ffffff?text=AI+Research" alt="AI Research Project" />
          </div>
          <div className="project-content">
            <h3 className="project-title">Multi-Agent Personality Detection System</h3>
            <p className="project-description">
              Developing an advanced AI system that uses multiple agents to detect personality traits 
              in human-generated texts using the OCEAN model for psychological profiling.
            </p>
            <div className="project-keywords">
              <span className="keyword">AI</span>
              <span className="keyword">NLP</span>
              <span className="keyword">Psychology</span>
              <span className="keyword">Multi-Agent</span>
            </div>
            <div className="project-links">
              <a href="#" target="_blank" rel="noopener noreferrer">Project Webpage</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Demo</a>
            </div>
          </div>
        </div>

        <div className="project">
          <div className="project-media">
            <img src="https://via.placeholder.com/400x280/764ba2/ffffff?text=Fashion+AI" alt="Fashion Recommendation Research" />
          </div>
          <div className="project-content">
            <h3 className="project-title">LLM-Based Fashion Recommendation System</h3>
            <p className="project-description">
              Research project exploring how large language models can improve user experience 
              in fashion recommendation systems through better content-based explanations.
            </p>
            <div className="project-keywords">
              <span className="keyword">LLM</span>
              <span className="keyword">Recommendation</span>
              <span className="keyword">Fashion</span>
              <span className="keyword">UX</span>
            </div>
            <div className="project-links">
              <a href="#" target="_blank" rel="noopener noreferrer">Project Webpage</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Code</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchProjects;