import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ResearchNetwork.css";

const ResearchNetwork = () => {
  const navigate = useNavigate();
  const [activeTopic, setActiveTopic] = useState(null);

  const topics = [
    {
      id: "llm",
      label: "LLM",
      x: 50,
      y: 50,
      size: 124,
      projects: ["TRIPLE (AAAI)", "TRIPLE (CIKM)", "KETI Platform", "CHI 2026"],
    },
    {
      id: "personalization",
      label: "Personalization",
      x: 25,
      y: 45,
      size: 104,
      projects: ["TRIPLE (AAAI)", "TRIPLE (CIKM)"],
    },
    {
      id: "safety",
      label: "AI Safety",
      x: 75,
      y: 38,
      size: 98,
      projects: ["CHI 2026", "LLM 유해성 분석"],
    },
    {
      id: "hci",
      label: "HCI",
      x: 70,
      y: 68,
      size: 93,
      projects: ["PADO", "CHI 2026"],
    },
    {
      id: "fashion",
      label: "Fashion",
      x: 22,
      y: 72,
      size: 88,
      projects: ["Fashion-FINE", "MOS"],
    },
  ];

  // Connection lines between related topics
  const connections = [
    { from: "llm", to: "personalization" },
    { from: "llm", to: "safety" },
    { from: "llm", to: "hci" },
    { from: "safety", to: "hci" },
    { from: "personalization", to: "fashion" },
  ];

  const getTopicById = (id) => topics.find((t) => t.id === id);

  return (
    <section className="research-network">
      <h2>Research Map</h2>
      <p className="network-subtitle">
        Explore the connections between my research areas
      </p>

      <div className="network-canvas">
        <svg viewBox="0 24 100 60" preserveAspectRatio="xMidYMid meet">
          {/* Connection lines */}
          {connections.map((conn, i) => {
            const from = getTopicById(conn.from);
            const to = getTopicById(conn.to);
            const isActive =
              activeTopic === conn.from || activeTopic === conn.to;
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={`network-line ${isActive ? "active" : ""}`}
              />
            );
          })}

          {/* Topic bubbles */}
          {topics.map((topic) => {
            const isActive = activeTopic === topic.id;
            const r = topic.size / 10;
            return (
              <g
                key={topic.id}
                className={`topic-bubble ${isActive ? "active" : ""}`}
                onMouseEnter={() => setActiveTopic(topic.id)}
                onMouseLeave={() => setActiveTopic(null)}
                onClick={() => navigate("/projects")}
                style={{ cursor: "pointer" }}
              >
                {/* Outer glow on hover */}
                {isActive && (
                  <circle
                    cx={topic.x}
                    cy={topic.y}
                    r={r + 1.5}
                    className="bubble-glow"
                  />
                )}
                <circle
                  cx={topic.x}
                  cy={topic.y}
                  r={r}
                  className="bubble-circle"
                />
                <text
                  x={topic.x}
                  y={topic.y}
                  className="bubble-label"
                  dominantBaseline="central"
                  textAnchor="middle"
                >
                  {topic.label}
                </text>
                {/* Project count */}
                <text
                  x={topic.x}
                  y={topic.y + r * 0.45}
                  className="bubble-count"
                  dominantBaseline="central"
                  textAnchor="middle"
                >
                  {topic.projects.length} projects
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {activeTopic && (
          <div className="network-tooltip">
            <strong>{getTopicById(activeTopic).label}</strong>
            <ul>
              {getTopicById(activeTopic).projects.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResearchNetwork;
