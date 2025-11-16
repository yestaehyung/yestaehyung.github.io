import React, { useState } from "react";
import "../styles/ResearchProjects.css";

const ResearchProjects = () => {
  const [filter, setFilter] = useState("all");
  const [isChaos, setIsChaos] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [hoveredTitle, setHoveredTitle] = useState(null);
  const [hoveredDescription, setHoveredDescription] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const projectsData = [
    {
      id: 1,
      title: "KETI Industrial AI Data Preprocessing Platform",
      description:
        "Developing an AI data preprocessing platform for industrial applications. This project provides an integrated solution for efficiently processing and analyzing data across various industrial domains.",
      role: "...",
      keywords: ["LLM", "Data Processing", "Platform"],
      // image: `${process.env.PUBLIC_URL}/images/projects/triple_overall.jpg`,
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
      title: "TRIPLE (AAAI)",
      description:
        "TRIPLE (Theory-guided Reasoning for Intent and habIt Profiling with LLMs for pErsonalization) is a novel framework that integrates dual-process theory and the Theory of Planned Behavior (TPB) into LLM-based user modeling. It constructs both habitual and intentional behavior profiles, then generates behavioral rationale that explains the interaction between these processes to predict user behavior.",
      role: "First Author",
      keywords: ["LLM", "Personalization", "Psychology"],
      image: `${process.env.PUBLIC_URL}/images/projects/aaai_framework.png`,
      status: "completed",
      links: [
        {
          url: "https://yestaehyung.github.io/aaai26-triple/#",
          text: "Project Page",
        },
      ],
    },
    {
      id: 3,
      title: "TRIPLE (CIKM)",
      description:
        "TRIPLE is a profiling technology that combines the Theory of Planned Behavior (TPB) with Large Language Models (LLMs). It uses LLMs to understand a user's psychological motivations and refines their profile by comparing predictions with actual behavior, dramatically improving personalization services.",
      role: "First Author",
      keywords: ["LLM", "Personalization", "Psychology"],
      image: `${process.env.PUBLIC_URL}/images/projects/triple_overall.jpg`,
      status: "completed",
      links: [
        {
          url: "https://yestaehyung.github.io/cikm25-triple/#",
          text: "Project Page",
        },
      ],
    },
    {
      id: 4,
      title: "LLM 유해성 공격 전략에 대한 실증적 분석",
      description:
        "This project analyzes real-world LLM vulnerabilities using attack data from the 2023 DEF CON 31 Generative AI Red Teaming Challenge. We preprocess and relabel the dataset to identify which target categories are most susceptible to harmful-content attacks and what prompt strategies attackers commonly use. By classifying victim groups (superclass/subclass) and categorizing prompt types (e.g., scenario-based, persona-driven, sentence-completion), the project reveals systematic patterns in successful jailbreaks and provides insights for improving AI safety and red-teaming methodologies.",
      role: "Project Leader",
      keywords: ["LLM", "Bias", "Attack"],
      // image: `${process.env.PUBLIC_URL}/images/projects/llm_attack.png`,
      status: "completed",
      links: [
        {
          url: "https://astlyi.s3.ap-northeast-2.amazonaws.com/2025/TTA_LLM+%E1%84%8B%E1%85%B2%E1%84%92%E1%85%A2%E1%84%89%E1%85%A5%E1%86%BC+%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A7%E1%86%A8+%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%85%E1%85%A3%E1%86%A8%E1%84%8B%E1%85%A6+%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AB+%E1%84%89%E1%85%B5%E1%86%AF%E1%84%8C%E1%85%B3%E1%86%BC%E1%84%8C%E1%85%A5%E1%86%A8+%E1%84%87%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%E1%86%A8.pdf",
          text: "Report",
        },
      ],
    },
    {
      id: 5,
      title: "Multi-Agent Personality Detection System (PADO 🌊)",
      description:
        "PADO is a multi-agent system that detects personality traits (OCEAN) from user-generated text. Multiple specialized agents collaborate to perform more accurate personality analysis, with each agent focusing on specific personality dimensions.",
      role: "Second Author",
      keywords: ["Multi-Agent", "Personality Detection", "OCEAN"],
      image: `${process.env.PUBLIC_URL}/images/projects/pado.png`,
      status: "completed",
      links: [
        {
          url: "https://aclanthology.org/2025.coling-main.382/",
          text: "Paper",
        },
      ],
    },
    {
      id: 6,
      title: "Fashion-FINE",
      description:
        "Fashion-FINE is a Vision-Language Pre-training model for fine-grained fashion retrieval. It introduces three key innovations: a modality-agnostic adapter for learning integrated representations from global and local features, hard negative mining with focal loss for better cross-modal alignment, and comprehensive cross-modal alignment to extract multi-level fashion information.",
      role: "Third Author",
      keywords: ["Retrieval", "Fashion"],
      image: `${process.env.PUBLIC_URL}/images/projects/fashion_fine.png`,
      status: "completed",
      links: [
        {
          url: "https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/10886.pdf",
          text: "Paper",
        },
      ],
    },
    {
      id: 7,
      title: "My Own Style (MOS)",
      description:
        "Recommender systems widely support user decision-making, yet users differ in how they understand and evaluate algorithmic results. This study investigates how domain expertise—specifically fashion knowledge and interest—shapes user perception and satisfaction with fashion-recommendation outcomes. We built My Own Style (MOS), a dashboard that analyzes a given outfit image and recommends similar/diverse fashion items using three algorithms with different similarity–diversity characteristics. A large-scale study with 166 participants shows that fashion experts better understand algorithmic outputs and prefer highly similar recommendations, whereas non-experts prefer more diverse results. These findings provide empirical implications for designing personalized RS experiences based on domain expertise.",
      role: "First Author",
      keywords: ["Fashion"],
      image: `${process.env.PUBLIC_URL}/images/projects/recommendation_examples.png`,
      status: "completed",
      links: [
        {
          url: "https://yestaehyung.github.io/lbw-mos/",
          text: "Project Page",
        },
      ],
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((project) => project.status === filter);

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
    <section id="projects" className="research-projects">
      <h2
        onClick={handleTitleClick}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        Research Projects
      </h2>

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

      <div className={`projects-list ${isChaos ? "chaos-mode" : ""}`}>
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="project"
            style={
              isChaos
                ? {
                    animationDelay: `${index * 0.15}s`,
                    "--random-x": `${Math.random() * 2000 - 1000}px`,
                    "--random-y": `${Math.random() * 1000 + 500}px`,
                    "--random-rotate": `${Math.random() * 720 - 360}deg`,
                  }
                : {}
            }
          >
            <div
              className="project-media"
              onClick={() => project.image && setZoomedImage(project.image)}
            >
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
                  onMouseEnter={(e) => {
                    setHoveredTitle(project.title);
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({ x: rect.left, y: rect.top });
                  }}
                  onMouseLeave={() => setHoveredTitle(null)}
                >
                  {project.title}
                </h3>
                <span className={`project-status ${project.status}`}>
                  {project.status === "ongoing"
                    ? "On-going"
                    : project.status === "under-review"
                    ? "Under Review"
                    : "Completed"}
                </span>
              </div>
              <p
                className="project-description"
                onMouseEnter={(e) => {
                  setHoveredDescription(project.description);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltipPosition({ x: rect.left, y: rect.top });
                }}
                onMouseLeave={() => setHoveredDescription(null)}
              >
                {project.description}
              </p>
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

      {zoomedImage && (
        <div className="image-modal" onClick={() => setZoomedImage(null)}>
          <div className="modal-content">
            <img src={zoomedImage} alt="Zoomed project" />
            <button
              className="modal-close"
              onClick={() => setZoomedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {hoveredTitle && (
        <div
          className="tooltip tooltip-below"
          style={{
            position: "fixed",
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y + 30}px`,
          }}
        >
          {hoveredTitle}
        </div>
      )}

      {hoveredDescription && (
        <div
          className="tooltip tooltip-below"
          style={{
            position: "fixed",
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y + 25}px`,
          }}
        >
          {hoveredDescription}
        </div>
      )}
    </section>
  );
};

export default ResearchProjects;
