import React, { useState } from "react";
import "../styles/ResearchProjects.css";

const ResearchProjects = () => {
  const [filter, setFilter] = useState("all");

  const projectsData = [
    {
      id: 1,
      title: "KETI Industrial AI Data Preprocessing Platform",
      description:
        "Developing an AI data preprocessing platform for industrial applications. This project provides an integrated solution for efficiently processing and analyzing data across various industrial domains.",
      role: "...",
      keywords: ["LLM", "Data Processing", "Platform"],
      image: `${process.env.PUBLIC_URL}/images/projects/triple_overall.jpg`,
      status: "ongoing",
      links: [
        {
          url: "https://keti-sam-labeling.vercel.app/",
          text: "Project Webpage",
        },
      ],
    },
    {
      id: 2,
      title: "TRIPLE",
      description:
        "TRIPLE is a profiling technology that combines the Theory of Planned Behavior (TPB) with Large Language Models (LLMs). It uses LLMs to understand a user's psychological motivations and refines their profile by comparing predictions with actual behavior, dramatically improving personalization services.",
      role: "First Author",
      keywords: ["LLM", "Personalization", "Psychology"],
      image: `${process.env.PUBLIC_URL}/images/projects/triple_overall.jpg`,
      status: "ongoing",
      links: [
        {
          url: "https://yestaehyung.github.io/cikm25-triple/#",
          text: "Project Webpage",
        },
      ],
    },
    {
      id: 3,
      title: "Multi-Agent Personality Detection System (PADO)",
      description:
        "PADO is a multi-agent system that detects personality traits (OCEAN) from user-generated text. Multiple specialized agents collaborate to perform more accurate personality analysis, with each agent focusing on specific personality dimensions.",
      role: "Second Author",
      keywords: ["Multi-Agent", "Personality Detection", "OCEAN"],
      image: `${process.env.PUBLIC_URL}/images/projects/triple_overall.jpg`,
      status: "completed",
      links: [
        {
          url: "https://aclanthology.org/2025.coling-main.382/",
          text: "Paper",
        },
      ],
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((project) => project.status === filter);

  return (
    <section id="projects" className="research-projects">
      <h2>Research Projects</h2>

      <div className="project-filters">
        <button
          className={`filter-button ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === "ongoing" ? "active" : ""}`}
          onClick={() => setFilter("ongoing")}
        >
          On-going
        </button>
        <button
          className={`filter-button ${
            filter === "under-review" ? "active" : ""
          }`}
          onClick={() => setFilter("under-review")}
        >
          Under Review
        </button>
        <button
          className={`filter-button ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <div className="projects-list">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project">
            <div className="project-media">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-content">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className={`project-status ${project.status}`}>
                  {project.status === "ongoing"
                    ? "On-going"
                    : project.status === "under-review"
                    ? "Under Review"
                    : "Completed"}
                </span>
              </div>
              <p className="project-description">{project.description}</p>
              {project.role && (
                <p className="project-role">
                  <strong>My Role:</strong> {project.role}
                </p>
              )}
              <div className="project-keywords">
                {project.keywords.map((keyword, index) => (
                  <span key={index} className="keyword">
                    {keyword}
                  </span>
                ))}
              </div>
              {project.links && (
                <div className="project-links">
                  {project.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResearchProjects;
