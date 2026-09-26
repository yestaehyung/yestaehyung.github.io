import React from "react";
import WindowFrame from "./WindowFrame";

const FileIcon = ({ project, color, onOpen }) => {
  const ongoing = project.status === "ongoing";
  return (
    <button
      type="button"
      className="pd-file"
      aria-label={`${project.name}${ongoing ? ", ongoing" : ""}`}
      onClick={onOpen}
    >
      <svg className="pd-file-art" viewBox="0 0 44 54" aria-hidden="true">
        <path
          d="M4 2h26l12 12v36a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
          fill="#fff"
          stroke="rgba(0,0,0,0.14)"
        />
        <path d="M30 2v10a2 2 0 0 0 2 2h10" fill="#f1f1f1" stroke="rgba(0,0,0,0.14)" />
        <rect x="9" y="22" width="26" height="3" rx="1.5" fill={color} opacity="0.85" />
        <rect x="9" y="29" width="20" height="3" rx="1.5" fill={color} opacity="0.35" />
        <rect x="9" y="36" width="23" height="3" rx="1.5" fill={color} opacity="0.35" />
      </svg>
      <span className="pd-file-label">{project.name}</span>
      {ongoing && <span className="pd-file-badge">Ongoing</span>}
    </button>
  );
};

// Finder window for one topic folder: a sidebar to hop between folders and a
// grid of project files.
const FinderWindow = ({ folders, folder, onSelectFolder, onOpenProject, onClose }) => (
  <WindowFrame title={folder.topic.label} className="pd-finder" onClose={onClose}>
    <nav className="pd-sidebar" aria-label="Topics">
      <p className="pd-sidebar-heading">Topics</p>
      {folders.map(({ topic }) => (
        <button
          key={topic.id}
          type="button"
          className={`pd-sidebar-item ${topic.id === folder.topic.id ? "is-active" : ""}`}
          aria-current={topic.id === folder.topic.id ? "true" : undefined}
          onClick={() => onSelectFolder(topic.id)}
        >
          <span className="pd-tag" style={{ background: topic.color }} />
          {topic.label}
        </button>
      ))}
    </nav>
    <div className="pd-files">
      {folder.projects.map((project) => (
        <FileIcon
          key={project.id}
          project={project}
          color={folder.topic.color}
          onOpen={() => onOpenProject(project.id)}
        />
      ))}
    </div>
  </WindowFrame>
);

export default FinderWindow;
