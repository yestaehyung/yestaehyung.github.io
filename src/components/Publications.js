import React from "react";
import "../styles/Publications.css";

const Publications = () => {
  return (
    <section className="publications">
      <h2>Publications</h2>
      <div className="publications-list">
        <div className="publication">
          <h3>
            Externalizing Social-Cognitive Structures for User Modeling: Toward
            Theory-Driven Profiling with LLMs
          </h3>
          <p className="authors">
            <strong>Taehyung Noh</strong>, Seungwan Jin, Haein Yeo, Kyungsik Han
          </p>
          <p className="conference">CIKM 2025 Short</p>
          {/* <div className="links">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              Paper
            </a>
          </div> */}
        </div>

        <div className="publication">
          <h3>
            LLM-Generated Content-Based Explanations for User Experience in
            Fashion Recommender Systems
          </h3>
          <p className="authors">
            Haein Yeo, <strong>Taehyung Noh</strong>, Kyungsik Han
          </p>
          <p className="conference">Fashion and Textiles</p>
          {/* <div className="links">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              Paper
            </a>
          </div> */}
        </div>

        <div className="publication">
          <h3>LLM 유해성 공격 전략에 대한 실증적 분석</h3>
          <p className="authors">
            Yeajin Shin, Kyungsik Han, <strong>Taehyung Noh</strong>, Mingon
            Jeong
          </p>
          <p className="conference">Fashion and Textiles</p>
          <div className="links">
            <a
              href="https://astlyi.s3.ap-northeast-2.amazonaws.com/2025/TTA_LLM+%E1%84%8B%E1%85%B2%E1%84%92%E1%85%A2%E1%84%89%E1%85%A5%E1%86%BC+%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A7%E1%86%A8+%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%85%E1%85%A3%E1%86%A8%E1%84%8B%E1%85%A6+%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AB+%E1%84%89%E1%85%B5%E1%86%AF%E1%84%8C%E1%85%B3%E1%86%BC%E1%84%8C%E1%85%A5%E1%86%A8+%E1%84%87%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%E1%86%A8.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report
            </a>
          </div>
        </div>

        <div className="publication">
          <h3>
            PADO: Personality-induced multi-Agents for Detecting OCEAN in
            human-generated texts
          </h3>
          <p className="authors">
            Haein Yeo, <strong>Taehyung Noh</strong>, Seungwan Jin, Kyungsik Han
          </p>
          <p className="conference">COLING 2025</p>
          <div className="links">
            <a
              href="https://aclanthology.org/2025.coling-main.382/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Paper
            </a>
          </div>
        </div>

        <div className="publication">
          <h3>
            Integration of global and local representations for fine-grained
            cross-modal alignment
          </h3>
          <p className="authors">
            Seungwan Jin, Hoyoung Choi, <strong>Taehyung Noh</strong>, Kyungsik
            Han
          </p>
          <p className="conference">ECCV 2024</p>
          <div className="links">
            <a
              href="https://link.springer.com/chapter/10.1007/978-3-031-73010-8_4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Paper
            </a>
          </div>
        </div>

        <div className="publication">
          <h3>
            A study on user perception and experience differences in
            recommendation results by domain expertise: the case of fashion
            domains
          </h3>
          <p className="authors">
            <strong>Taehyung Noh</strong>, Haein Yeo, Myungin Kim, Kyungsik Han
          </p>
          <p className="conference">CHI LBW 2023</p>
          <div className="links">
            <a
              href="https://dl.acm.org/doi/abs/10.1145/3544549.3585641"
              target="_blank"
              rel="noopener noreferrer"
            >
              Paper
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
