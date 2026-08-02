import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/filters.css";
import "../styles/FeaturedProjects.css";
import projectsDataRaw, { topicMap, topics } from "../data/projectsData";

const FeaturedProjects = () => {
  const [topicFilter, setTopicFilter] = useState("all");

  const projectsData = projectsDataRaw.map((p) => ({
    ...p,
    image: p.image ? `${process.env.PUBLIC_URL}${p.image}` : null,
  }));

  // Sort ongoing first, then filter by topic, take top 3
  const sorted = [...projectsData].sort((a, b) => {
    if (a.status === "ongoing" && b.status !== "ongoing") return -1;
    if (a.status !== "ongoing" && b.status === "ongoing") return 1;
    return 0;
  });

  const filtered = sorted
    .filter((project) => {
      if (topicFilter === "all") return true;
      const matchKeywords = topicMap[topicFilter] || [topicFilter];
      return project.keywords.some((kw) => matchKeywords.includes(kw));
    })
    .slice(0, 3);

  return (
    <section className="featured-projects">
      <div className="featured-header">
        <h2>Research Projects</h2>
        <Link to="/projects" className="view-all-link">
          All Projects
          <span className="view-all-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>

      <div className="featured-filters">
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

      <div className="featured-list">
        {filtered.map((project) => (
          <div key={project.id} className="featured-project">
            {project.image && (
              <div className="featured-image">
                <img src={project.image} alt={project.title} />
              </div>
            )}
            <div className="featured-content">
              <div className="featured-title-row">
                <h3>{project.title}</h3>
                <span className={`featured-status ${project.status}`}>
                  {project.status === "ongoing" ? "On-going" : "Completed"}
                </span>
              </div>
              <p className="featured-description">{project.description}</p>
              <div className="featured-bottom">
                <div className="featured-keywords">
                  {project.keywords.map((kw, i) => (
                    <span key={i} className="keyword">
                      {kw}
                    </span>
                  ))}
                </div>
                <div className="featured-links">
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="featured-badge"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
