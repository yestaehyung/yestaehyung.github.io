import React from "react";
import WindowFrame from "./WindowFrame";

// Roles like "..." are placeholders in projectsData and are not shown.
const hasRole = (role) => Boolean(role) && /\w/.test(role);

const ProjectWindow = ({ project, color, onClose }) => {
  const ongoing = project.status === "ongoing";
  return (
    <WindowFrame title={project.name} className="pd-project" onClose={onClose}>
      <article className="pd-project-body" style={{ "--topic-color": color }}>
        <h4 className="pd-project-title">{project.title}</h4>
        <p className="pd-project-meta">
          {hasRole(project.role) && <span>{project.role}</span>}
          <span className={`pd-status ${ongoing ? "is-ongoing" : ""}`}>
            {ongoing ? "Ongoing" : "Completed"}
          </span>
        </p>
        <p className="pd-project-desc">{project.description}</p>
        {project.keywords?.length > 0 && (
          <ul className="pd-keywords" aria-label="Keywords">
            {project.keywords.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        )}
        {project.links?.length > 0 && (
          <div className="pd-links">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pd-link"
              >
                {link.text}
              </a>
            ))}
          </div>
        )}
      </article>
    </WindowFrame>
  );
};

export default ProjectWindow;
