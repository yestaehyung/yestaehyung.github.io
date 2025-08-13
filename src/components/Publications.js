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
