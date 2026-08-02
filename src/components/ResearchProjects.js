import React, { useState } from "react";
import "../styles/filters.css";
import "../styles/ResearchProjects.css";
import projectsDataRaw, { topicMap, topics } from "../data/projectsData";

const ResearchProjects = () => {
  const [topicFilter, setTopicFilter] = useState("all");
  const [isChaos, setIsChaos] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [hoveredTitle, setHoveredTitle] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const toggleExpanded = (id) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  // Sort: ongoing first
  const sortedProjects = [...projectsDataRaw].sort((a, b) => {
    if (a.status === "ongoing" && b.status !== "ongoing") return -1;
    if (a.status !== "ongoing" && b.status === "ongoing") return 1;
    return 0;
  });

  const filteredProjects = sortedProjects.filter((project) => {
    if (topicFilter === "all") return true;
    const matchKeywords = topicMap[topicFilter] || [topicFilter];
    return project.keywords.some((kw) => matchKeywords.includes(kw));
  });

  const handleTitleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 3) {
      setIsChaos(true);
      setTimeout(() => { setIsChaos(false); setClickCount(0); }, 3000);
    }
    setTimeout(() => { if (clickCount < 2) setClickCount(0); }, 1000);
  };

  return (
    <section id="projects" className="research-projects">
      <h2 onClick={handleTitleClick} style={{ cursor: "pointer", userSelect: "none" }}>
        Research Projects
      </h2>

      <div className="project-filters">
        {topics.map((topic) => (
          <button
            key={topic}
            className={`filter-button ${topicFilter === topic ? "active" : ""}`}
            onClick={() => setTopicFilter(topic)}
          >
            {topic === "all" ? "All" : topic}
          </button>
        ))}
      </div>

      <div className={`projects-list ${isChaos ? "chaos-mode" : ""}`}>
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="project"
            style={isChaos ? {
              animationDelay: `${index * 0.15}s`,
              "--random-x": `${Math.random() * 2000 - 1000}px`,
              "--random-y": `${Math.random() * 1000 + 500}px`,
              "--random-rotate": `${Math.random() * 720 - 360}deg`,
            } : {}}
          >
            <div className="project-content">
              <div className="project-header">
                <h3
                  className="project-title"
                  onMouseEnter={(e) => { setHoveredTitle(project.title); setTooltipPosition({ x: e.currentTarget.getBoundingClientRect().left, y: e.currentTarget.getBoundingClientRect().top }); }}
                  onMouseLeave={() => setHoveredTitle(null)}
                >
                  {project.title}
                </h3>
                <span className={`project-status ${project.status}`}>
                  {project.status === "ongoing" ? "On-going" : "Completed"}
                </span>
              </div>
              <p
                className={`project-description ${expandedId === project.id ? "expanded" : ""}`}
                role="button"
                tabIndex={0}
                aria-expanded={expandedId === project.id}
                aria-label={`${project.title} description, press to expand`}
                onClick={() => toggleExpanded(project.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleExpanded(project.id);
                  }
                }}
              >
                {project.description}
              </p>
              <div className="project-keywords">
                {project.keywords.map((keyword, i) => (
                  <span key={i} className="keyword">{keyword}</span>
                ))}
              </div>
              {project.links && (
                <div className="project-links">
                  {project.links.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {hoveredTitle && (
        <div className="tooltip tooltip-below" style={{ position: "fixed", left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y + 30}px` }}>
          {hoveredTitle}
        </div>
      )}
    </section>
  );
};

export default ResearchProjects;
