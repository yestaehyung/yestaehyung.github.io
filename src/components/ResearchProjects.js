import React from "react";
import "../styles/ResearchProjects.css";

const ResearchProjects = () => {
  return (
    <section id="projects" className="research-projects">
      <h2>Research Projects</h2>
      <div className="projects-list">
        <div className="project">
          <div className="project-media">
            <img
              src="https://via.placeholder.com/400x280/667eea/ffffff?text=AI+Research"
              alt="AI Research Project"
            />
          </div>
          <div className="project-content">
            <h3 className="project-title">
              Project TRIPLE: Deepening Personalization with Psychological AI
            </h3>
            <p className="project-description">
              TRIPLE is a profiling technology that combines the Theory of
              Planned Behavior (TPB) with Large Language Models (LLMs). It uses
              LLMs to understand a user's psychological motivations and refines
              their profile by comparing predictions with actual behavior,
              dramatically improving personalization services.
            </p>
            <div className="project-keywords">
              <span className="keyword">LLM</span>
              <span className="keyword">Personalization</span>
            </div>
            <div className="project-links">
              <a
                href="https://yestaehyung.github.io/cikm25-triple/#"
                target="_blank"
                rel="noopener noreferrer"
              >
                Project Webpage
              </a>
            </div>
          </div>
        </div>
        {/* Multi-Agent Personality Detection System */}
      </div>
    </section>
  );
};

export default ResearchProjects;
