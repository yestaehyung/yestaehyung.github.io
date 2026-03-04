import React from "react";
import "../styles/Introduction.css";

const Introduction = () => {
  return (
    <section id="about-me" className="introduction">
      <div className="intro-text">
        <p>
          Hi! I'm a 3rd-year Ph.D. student in the{" "}
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
          . I am advised by Prof. Kyungsik Han as part of the{" "}
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
          My research focuses on understanding and modeling humans through the
          lens of psychological and behavioral theories, and exploring how to
          align Large Language Models (LLMs) with individual users. I am
          particularly interested in bridging the gap between how people
          actually think and behave, and how AI systems represent and adapt to
          them.
        </p>
        <p>
          Specifically, I investigate (1) theory-driven user modeling that
          integrates established psychological frameworks—such as the Theory of
          Planned Behavior—into LLMs for deeper user understanding (TRIPLE,
          AAAI 2026), and (2) the fundamental challenge of LLM-human alignment:
          how can we ensure AI systems truly reflect user preferences when users
          themselves may not accurately articulate what they want? I also work
          on building human-in-the-loop systems that keep humans meaningfully
          involved in AI decision-making processes.
        </p>

        <div className="research-interests">
          <p>
            <strong>Research interests:</strong> Human-Centered AI,
            Personalization, LLM-based User Modeling, LLM Bias
          </p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
