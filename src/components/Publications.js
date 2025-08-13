import React, { useState } from "react";
import "../styles/Publications.css";

const Publications = () => {
  const [filter, setFilter] = useState("all");
  
  const publicationsData = [
    {
      id: 1,
      title: "Externalizing Social-Cognitive Structures for User Modeling: Toward Theory-Driven Profiling with LLMs",
      authors: [
        { name: "Taehyung Noh", isAuthor: true },
        { name: "Seungwan Jin", isAuthor: false },
        { name: "Haein Yeo", isAuthor: false },
        { name: "Kyungsik Han", isAuthor: false }
      ],
      venue: "CIKM 2025 Short",
      type: "conference",
      link: null
    },
    {
      id: 2,
      title: "LLM-Generated Content-Based Explanations for User Experience in Fashion Recommender Systems",
      authors: [
        { name: "Haein Yeo", isAuthor: false },
        { name: "Taehyung Noh", isAuthor: true },
        { name: "Kyungsik Han", isAuthor: false }
      ],
      venue: "Fashion and Textiles",
      type: "journal",
      link: null
    },
    {
      id: 3,
      title: "LLM 유해성 공격 전략에 대한 실증적 분석",
      authors: [
        { name: "Yeajin Shin", isAuthor: false },
        { name: "Kyungsik Han", isAuthor: false },
        { name: "Taehyung Noh", isAuthor: true },
        { name: "Mingon Jeong", isAuthor: false }
      ],
      venue: "TTA Report",
      type: "report",
      link: "https://astlyi.s3.ap-northeast-2.amazonaws.com/2025/TTA_LLM+%E1%84%8B%E1%85%B2%E1%84%92%E1%85%A2%E1%84%89%E1%85%A5%E1%86%BC+%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A7%E1%86%A8+%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%85%E1%85%A3%E1%86%A8%E1%84%8B%E1%85%A6+%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AB+%E1%84%89%E1%85%B5%E1%86%AF%E1%84%8C%E1%85%B3%E1%86%BC%E1%84%8C%E1%85%A5%E1%86%A8+%E1%84%87%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%E1%86%A8.pdf"
    },
    {
      id: 4,
      title: "PADO: Personality-induced multi-Agents for Detecting OCEAN in human-generated texts",
      authors: [
        { name: "Haein Yeo", isAuthor: false },
        { name: "Taehyung Noh", isAuthor: true },
        { name: "Seungwan Jin", isAuthor: false },
        { name: "Kyungsik Han", isAuthor: false }
      ],
      venue: "COLING 2025",
      type: "conference",
      link: "https://aclanthology.org/2025.coling-main.382/"
    },
    {
      id: 5,
      title: "Integration of global and local representations for fine-grained cross-modal alignment",
      authors: [
        { name: "Seungwan Jin", isAuthor: false },
        { name: "Hoyoung Choi", isAuthor: false },
        { name: "Taehyung Noh", isAuthor: true },
        { name: "Kyungsik Han", isAuthor: false }
      ],
      venue: "ECCV 2024",
      type: "conference",
      link: "https://link.springer.com/chapter/10.1007/978-3-031-73010-8_4"
    },
    {
      id: 6,
      title: "A study on user perception and experience differences in recommendation results by domain expertise: the case of fashion domains",
      authors: [
        { name: "Taehyung Noh", isAuthor: true },
        { name: "Haein Yeo", isAuthor: false },
        { name: "Myungin Kim", isAuthor: false },
        { name: "Kyungsik Han", isAuthor: false }
      ],
      venue: "CHI LBW 2023",
      type: "conference",
      link: "https://dl.acm.org/doi/abs/10.1145/3544549.3585641"
    }
  ];

  const filteredPublications = filter === "all" 
    ? publicationsData 
    : publicationsData.filter(pub => pub.type === filter);

  return (
    <section id="publications" className="publications">
      <h2>Publications</h2>
      
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

      <div className="publications-list">
        {filteredPublications.map(publication => (
          <div key={publication.id} className="publication">
            <h3>{publication.title}</h3>
            <p className="authors">
              {publication.authors.map((author, index) => (
                <span key={index}>
                  {author.isAuthor ? <strong>{author.name}</strong> : author.name}
                  {index < publication.authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p className="conference">{publication.venue}</p>
            {publication.link && (
              <div className="links">
                <a
                  href={publication.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {publication.type === "report" ? "Report" : "Paper"}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Publications;
