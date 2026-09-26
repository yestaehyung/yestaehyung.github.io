import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Introduction.css";

const Introduction = () => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <section id="about-me" className="introduction">
      <div className={`intro-text ${showDetail ? "" : "collapsed"}`}>
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
        <p className="intro-detail">
          Concretely, I work on (1) <strong>theory-driven user modeling</strong>{" "}
          that brings established frameworks—such as the Theory of Planned
          Behavior—into LLM-based personalization (TRIPLE, AAAI 2026), and
          models how users' context shifts over time (Dycon, NeurIPS 2026); (2){" "}
          <strong>value-based user understanding</strong>—whether LLMs can infer
          the deeper human values behind people's choices rather than merely
          matching surface preferences, and whether that understanding
          transfers to new contexts (PALETTE, CIKM 2026); and (3) the broader{" "}
          <strong>LLM–human alignment</strong> problem, including how LLMs can
          mislead the people they talk to (CHI 2026): how do we make AI
          faithfully reflect users when users themselves cannot always
          articulate what they want? I also build human-in-the-loop systems
          that keep people meaningfully involved in AI decisions.
        </p>

        <button
          type="button"
          className="intro-toggle"
          aria-expanded={showDetail}
          onClick={() => setShowDetail((v) => !v)}
        >
          {showDetail ? "Show less" : "Read more about my research"}
        </button>

        <div className="research-interests">
          <p>
            <strong>Research interests:</strong> Human-Centered AI, LLM
            Alignment, Human Values, Personalization, LLM-based User Modeling
          </p>
        </div>

        <p className="projects-pointer">
          Ongoing work, including projects not yet published, is on the{" "}
          <Link to="/projects">Projects</Link> page.
        </p>
      </div>
    </section>
  );
};

export default Introduction;
