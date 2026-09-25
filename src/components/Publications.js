import React, { useEffect, useState } from "react";
import "../styles/filters.css";
import "../styles/Publications.css";
import publicationsData from "../data/publicationsData";
import researchTopics from "../data/researchTopics";

const HIGHLIGHT_MS = 2200;

// Topic chips use the ResearchGraph's topic order and colours, so a paper's
// chips always match the clusters it sits in on the graph.
const topicsOf = (publication) =>
  researchTopics.filter((t) => publication.topics.includes(t.id));

export const publicationAnchorId = (id) => `pub-${id}`;

// `focusRequest` ({ id }) comes from the ResearchGraph: show the paper
// (resetting a filter that would hide it), scroll to it, and flash it.
const Publications = ({ focusRequest = null }) => {
  const [filter, setFilter] = useState("all");
  const [isChaos, setIsChaos] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [highlightedId, setHighlightedId] = useState(null);

  useEffect(() => {
    if (!focusRequest) return undefined;
    setFilter("all");
    setHighlightedId(focusRequest.id);
    const timer = setTimeout(() => setHighlightedId(null), HIGHLIGHT_MS);
    return () => clearTimeout(timer);
  }, [focusRequest]);

  useEffect(() => {
    if (highlightedId === null) return;
    const el = document.getElementById(publicationAnchorId(highlightedId));
    if (!el) return;
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView?.({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
  }, [highlightedId]);

  const filteredPublications =
    filter === "all"
      ? publicationsData
      : publicationsData.filter((pub) => pub.type === filter);

  const handleTitleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 3) {
      setIsChaos(true);
      setTimeout(() => {
        setIsChaos(false);
        setClickCount(0);
      }, 3000);
    }

    setTimeout(() => {
      if (clickCount < 2) setClickCount(0);
    }, 1000);
  };

  return (
    <section id="publications" className="publications">
      <h2
        onClick={handleTitleClick}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        Publications
      </h2>

      <div className="publication-filters">
        <button
          className={`filter-button ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === "conference" ? "active" : ""}`}
          onClick={() => setFilter("conference")}
        >
          Conference
        </button>
        <button
          className={`filter-button ${filter === "journal" ? "active" : ""}`}
          onClick={() => setFilter("journal")}
        >
          Journal
        </button>
      </div>

      <div className={`publications-list ${isChaos ? "chaos-mode" : ""}`}>
        {filteredPublications.map((publication, index) => (
          <div
            key={publication.id}
            id={publicationAnchorId(publication.id)}
            className={`publication ${
              highlightedId === publication.id ? "is-highlighted" : ""
            }`}
            style={
              isChaos
                ? {
                    animationDelay: `${index * 0.1}s`,
                    "--random-x": `${Math.random() * 2000 - 1000}px`,
                    "--random-y": `${Math.random() * 1000 + 500}px`,
                    "--random-rotate": `${Math.random() * 720 - 360}deg`,
                  }
                : {}
            }
          >
            <div className="publication-content">
              <h3>{publication.title}</h3>
              <p className="authors">
                {publication.authors.map((author, idx) => (
                  <span key={idx}>
                    {author.isAuthor ? (
                      <strong className="highlight-author">
                        {author.name}
                      </strong>
                    ) : (
                      author.name
                    )}
                    {idx < publication.authors.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <div className="venue-links">
                <span className="venue">{publication.venue}</span>
                {publication.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-badge"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
              <ul className="topic-chips" aria-label="Research topics">
                {topicsOf(publication).map((topic) => (
                  <li
                    key={topic.id}
                    className="topic-chip"
                    style={{ "--topic-color": topic.color }}
                  >
                    {topic.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Publications;
