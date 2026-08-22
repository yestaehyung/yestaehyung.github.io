import React, { useState } from "react";
import "../styles/filters.css";
import "../styles/Publications.css";

const Publications = () => {
  const [filter, setFilter] = useState("all");
  const [isChaos, setIsChaos] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const publicationsData = [
    {
      id: 9,
      title:
        "From Preferences to Values: Evaluating Latent User Understanding and Transfer in LLMs",
      authors: [
        { name: "Taehyung Noh", isAuthor: true },
        { name: "Haein Yeo", isAuthor: false },
        { name: "Beejin Son", isAuthor: false },
        { name: "Kyungsik Han", isAuthor: false },
      ],
      venue: "ACM CIKM 2026 (short paper)",
      type: "conference",
      image: null,
      links: [
        {
          url: "https://taehyungnoh.com/cikm26-palette/",
          text: "Project Page",
        },
      ],
    },
    {
      id: 8,
      title:
        '"Can LLMs Persuade Humans with Deception?": From a Deceptive Strategy Taxonomy to a Large-Scale Empirical Study',
      authors: [
        { name: "Haein Yeo", isAuthor: false },
        { name: "Seungwan Jin", isAuthor: false },
        { name: "Taehyung Noh", isAuthor: true },
        { name: "Yejin Shin", isAuthor: false },
        { name: "Sangyeon Kang", isAuthor: false },
        { name: "Sangwoo Heo", isAuthor: false },
        { name: "Jiwon Chung", isAuthor: false },
        { name: "Hwarim Hyun", isAuthor: false },
        { name: "Kyungsik Han", isAuthor: false },
      ],
      venue: "ACM CHI 2026 (full paper)",
      type: "conference",
      image: `${process.env.PUBLIC_URL}/images/projects/llm_deception.png`,
      links: [
        {
          url: "https://astlyi.s3.ap-northeast-2.amazonaws.com/2026/2026_CHI_Can_LLMs_Persuade_Humans_with_Deception.pdf",
          text: "Paper",
        },
        {
          url: "https://taehyungnoh.com/chi26-deception/",
          text: "Project Page",
        },
      ],
    },
    {
      id: 1,
      title:
        "TRIPLE: Theory-Driven Integration of Planned and Habitual Behaviors for LLM-based Personalization",
      authors: [
        { name: "Taehyung Noh", isAuthor: true },
        { name: "Seungwan Jin", isAuthor: false },
        { name: "Haein Yeo", isAuthor: false },
        { name: "Kyungsik Han", isAuthor: false },
      ],
      venue: "AAAI 2026 (full paper, oral)",
      type: "conference",
      image: `${process.env.PUBLIC_URL}/images/projects/aaai_framework.png`,
      links: [
        {
          url: "https://taehyungnoh.com/aaai26-triple/",
          text: "Project Page",
        },
        {
          url: "https://youtu.be/96bo422tDp4",
          text: "Video",
        },
      ],
    },
    {
      id: 2,
      title:
        "Externalizing Social-Cognitive Structures for User Modeling: Toward Theory-Driven Profiling with LLMs",
      authors: [
        { name: "Taehyung Noh", isAuthor: true },
        { name: "Seungwan Jin", isAuthor: false },
        { name: "Haein Yeo", isAuthor: false },
        { name: "Kyungsik Han", isAuthor: false },
      ],
      venue: "ACM CIKM 2025 (short paper)",
      type: "conference",
      image: `${process.env.PUBLIC_URL}/images/projects/triple_overall.jpg`,
      links: [
        {
          url: "https://dl.acm.org/doi/10.1145/3746252.3760965",
          text: "Paper",
        },
        {
          url: "https://taehyungnoh.com/cikm25-triple/",
          text: "Project Page",
        },
        {
          url: "https://youtu.be/QW6qo4MOeL0",
          text: "Video",
        },
      ],
    },
    {
      id: 3,
      title:
        "LLM-Generated Content-Based Explanations for User Experience in Fashion Recommender Systems",
      authors: [
        { name: "Haein Yeo", isAuthor: false },
        { name: "Taehyung Noh", isAuthor: true },
        { name: "Kyungsik Han", isAuthor: false },
      ],
      venue: "Fashion and Textiles (journal)",
      type: "journal",
      image: null,
      links: [],
    },
    {
      id: 4,
      title: "LLM 유해성 공격 전략에 대한 실증적 분석",
      authors: [
        { name: "Yeajin Shin", isAuthor: false },
        { name: "Kyungsik Han", isAuthor: false },
        { name: "Taehyung Noh", isAuthor: true },
        { name: "Mingon Jeong", isAuthor: false },
      ],
      venue: "TTA Report",
      type: "report",
      image: `${process.env.PUBLIC_URL}/images/projects/llm_attack.png`,
      links: [
        {
          url: "https://astlyi.s3.ap-northeast-2.amazonaws.com/2025/TTA_LLM+%E1%84%8B%E1%85%B2%E1%84%92%E1%85%A2%E1%84%89%E1%85%A5%E1%86%BC+%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A7%E1%86%A8+%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%85%E1%85%A3%E1%86%A8%E1%84%8B%E1%85%A6+%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AB+%E1%84%89%E1%85%B5%E1%86%AF%E1%84%8C%E1%85%B3%E1%86%BC%E1%84%8C%E1%85%A5%E1%86%A8+%E1%84%87%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%E1%86%A8.pdf",
          text: "Paper",
        },
      ],
    },
    {
      id: 5,
      title:
        "PADO: Personality-induced multi-Agents for Detecting OCEAN in human-generated texts",
      authors: [
        { name: "Haein Yeo", isAuthor: false },
        { name: "Taehyung Noh", isAuthor: true },
        { name: "Seungwan Jin", isAuthor: false },
        { name: "Kyungsik Han", isAuthor: false },
      ],
      venue: "COLING 2025",
      type: "conference",
      image: `${process.env.PUBLIC_URL}/images/projects/pado.png`,
      links: [
        {
          url: "https://aclanthology.org/2025.coling-main.382/",
          text: "Paper",
        },
        {
          url: "https://taehyungnoh.com/coling25-pado/",
          text: "Project Page",
        },
      ],
    },
    {
      id: 6,
      title:
        "Integration of global and local representations for fine-grained cross-modal alignment",
      authors: [
        { name: "Seungwan Jin", isAuthor: false },
        { name: "Hoyoung Choi", isAuthor: false },
        { name: "Taehyung Noh", isAuthor: true },
        { name: "Kyungsik Han", isAuthor: false },
      ],
      venue: "ECCV 2024",
      type: "conference",
      image: `${process.env.PUBLIC_URL}/images/projects/fashion_fine.png`,
      links: [
        {
          url: "https://link.springer.com/chapter/10.1007/978-3-031-73010-8_4",
          text: "Paper",
        },
      ],
    },
    {
      id: 7,
      title:
        "A study on user perception and experience differences in recommendation results by domain expertise: the case of fashion domains",
      authors: [
        { name: "Taehyung Noh", isAuthor: true },
        { name: "Haein Yeo", isAuthor: false },
        { name: "Myungin Kim", isAuthor: false },
        { name: "Kyungsik Han", isAuthor: false },
      ],
      venue: "ACM CHI LBW 2023",
      type: "conference",
      image: `${process.env.PUBLIC_URL}/images/projects/recommendation_examples.png`,
      links: [
        {
          url: "https://dl.acm.org/doi/abs/10.1145/3544549.3585641",
          text: "Paper",
        },
        {
          url: "https://taehyungnoh.com/chi23-mos/",
          text: "Project Page",
        },
      ],
    },
  ];

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
            className="publication"
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
                      <strong className="highlight-author">{author.name}</strong>
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Publications;
