import React from "react";

// A macOS-style folder drawn in SVG, in the classic Finder blue.
const FolderIcon = ({ topic, count, isOpen, onOpen }) => {
  const gradientId = `pd-folder-front-${topic.id}`;
  return (
    <button
      type="button"
      className={`pd-folder ${isOpen ? "is-open" : ""}`}
      aria-label={`${topic.label} folder`}
      aria-expanded={isOpen}
      onClick={onOpen}
    >
      <svg className="pd-folder-art" viewBox="0 0 64 52" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8fd0ff" />
            <stop offset="100%" stopColor="#4aa6ee" />
          </linearGradient>
        </defs>
        <path
          d="M4 8a4 4 0 0 1 4-4h14.5a4 4 0 0 1 3 1.4L29 9h27a4 4 0 0 1 4 4v4H4z"
          fill="#5eb2f2"
        />
        <rect x="2" y="14" width="60" height="36" rx="5" fill={`url(#${gradientId})`} />
        <rect x="2" y="14" width="60" height="1.5" fill="#ffffff" opacity="0.5" />
      </svg>
      <span className="pd-folder-label">{topic.label}</span>
      <span className="pd-folder-count" aria-hidden="true">
        {count} {count === 1 ? "item" : "items"}
      </span>
    </button>
  );
};

export default FolderIcon;
