import React, { useState } from "react";
import "../styles/ResearchProjects.css";
import projectsDataRaw, { topicMap, topics } from "../data/projectsData";

const ResearchProjects = () => {
  const [topicFilter, setTopicFilter] = useState("all");
  const [isChaos, setIsChaos] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [hoveredTitle, setHoveredTitle] = useState(null);
  const [hoveredDescription, setHoveredDescription] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const projectsData = projectsDataRaw.map((p) => ({
    ...p,
    image: p.image ? `${process.env.PUBLIC_URL}${p.image}` : null,
  }));

  // Sort: ongoing first
  const sortedProjects = [...projectsData].sort((a, b) => {
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
            <div className="project-media" onClick={() => project.image && setZoomedImage(project.image)}>
              {project.image ? (
                <img src={project.image} alt={project.title} />
              ) : (
                <div className="project-placeholder">
                  <span className="project-no-image">No Image</span>
                </div>
              )}
            </div>
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
                className="project-description"
                onMouseEnter={(e) => { setHoveredDescription(project.description); setTooltipPosition({ x: e.currentTarget.getBoundingClientRect().left, y: e.currentTarget.getBoundingClientRect().top }); }}
                onMouseLeave={() => setHoveredDescription(null)}
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

      {zoomedImage && (
        <div className="image-modal" onClick={() => setZoomedImage(null)}>
          <div className="modal-content">
            <img src={zoomedImage} alt="Zoomed project" />
            <button className="modal-close" onClick={() => setZoomedImage(null)}>✕</button>
          </div>
        </div>
      )}

      {hoveredTitle && (
        <div className="tooltip tooltip-below" style={{ position: "fixed", left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y + 30}px` }}>
          {hoveredTitle}
        </div>
      )}
      {hoveredDescription && (
        <div className="tooltip tooltip-below" style={{ position: "fixed", left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y + 25}px` }}>
          {hoveredDescription}
        </div>
      )}
    </section>
  );
};

export default ResearchProjects;
