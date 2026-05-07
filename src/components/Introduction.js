import React from "react";
import "../styles/Introduction.css";

const Introduction = () => {
  return (
    <section id="about-me" className="introduction">
      <div className="intro-text">
        <p>
          Hi! I'm a 4th-year Ph.D. student in the{" "}
          <a
            href="https://nextai.hanyang.ac.kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            School of Artificial Intelligence
          </a>{" "}
          at{" "}
          <a
            href="https://www.hanyang.ac.kr/web/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hanyang University
          </a>
          , advised by Prof. Kyungsik Han in the{" "}
          <a
            href="http://hcc.hanyang.ac.kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Human-Centered Computing Lab
          </a>
          .
        </p>
        <p>
          I study how to understand and model people through psychological and
          behavioral theories, and how to align Large Language Models (LLMs)
          with the individuals they serve. What draws me to this work is the
          gap between how people actually think and behave and how AI systems
          represent them.
        </p>
        <p>
          Concretely, I work on (1) theory-driven user modeling that brings
          established frameworks—such as the Theory of Planned Behavior—into
          LLM-based personalization (TRIPLE, AAAI 2026), and (2) the broader
          LLM-human alignment problem: how do we make AI faithfully reflect
          users when users themselves cannot always articulate what they want?
          I also build human-in-the-loop systems that keep people meaningfully
          involved in AI decisions.
        </p>

        <div className="research-interests">
          <p>
            <strong>Research interests:</strong> Human-Centered AI, LLM
            Alignment, Personalization, LLM-based User Modeling, LLM Bias
          </p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
