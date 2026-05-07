const projectsData = [
  {
    id: 8,
    title: "LLM Deceptive Persuasion (CHI 2026)",
    description:
      "This project investigates whether Large Language Models can persuade humans using deceptive strategies. We develop a taxonomy of deceptive persuasion strategies and conduct a large-scale empirical study to analyze how LLMs leverage these strategies in persuasive interactions, providing insights into AI safety and human-AI trust.",
    role: "Co-Author",
    keywords: ["LLM", "Persuasion", "AI Safety", "HCI"],
    image: "/images/projects/llm_deception.png",
    status: "completed",
    links: [
      {
        url: "https://astlyi.s3.ap-northeast-2.amazonaws.com/2026/2026_CHI_Can_LLMs_Persuade_Humans_with_Deception.pdf",
        text: "Paper",
      },
    ],
  },
  {
    id: 1,
    title: "KETI Industrial AI Data Preprocessing Platform",
    description:
      "Developing an AI data preprocessing platform for industrial applications. This project provides an integrated solution for efficiently processing and analyzing data across various industrial domains.",
    role: "...",
    keywords: ["LLM", "Data Processing", "Platform"],
    image: "/images/projects/keti_platform.png",
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
    image: "/images/projects/aaai_framework.png",
    status: "completed",
    links: [
      {
        url: "https://taehyungnoh.com/aaai26-triple/#",
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
    image: "/images/projects/triple_overall.jpg",
    status: "completed",
    links: [
      {
        url: "https://taehyungnoh.com/cikm25-triple/#",
        text: "Project Page",
      },
    ],
  },
  {
    id: 4,
    title: "LLM 유해성 공격 전략에 대한 실증적 분석",
    description:
      "This project analyzes real-world LLM vulnerabilities using attack data from the 2023 DEF CON 31 Generative AI Red Teaming Challenge. We preprocess and relabel the dataset to identify which target categories are most susceptible to harmful-content attacks and what prompt strategies attackers commonly use.",
    role: "Project Leader",
    keywords: ["LLM", "Bias", "Attack"],
    image: "/images/projects/llm_attack.png",
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
    image: "/images/projects/pado.png",
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
    image: "/images/projects/fashion_fine.png",
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
      "Recommender systems widely support user decision-making, yet users differ in how they understand and evaluate algorithmic results. This study investigates how domain expertise shapes user perception and satisfaction with fashion-recommendation outcomes.",
    role: "First Author",
    keywords: ["Fashion"],
    image: "/images/projects/recommendation_examples.png",
    status: "completed",
    links: [
      {
        url: "https://taehyungnoh.com/lbw-mos/",
        text: "Project Page",
      },
    ],
  },
];

export const topicMap = {
  LLM: ["LLM"],
  Personalization: ["Personalization"],
  "AI Safety": ["AI Safety", "Bias", "Attack", "Persuasion"],
  HCI: ["HCI", "Personality Detection", "OCEAN", "Multi-Agent"],
  Fashion: ["Fashion", "Retrieval"],
};

export const topics = ["all", "LLM", "Personalization", "AI Safety", "HCI", "Fashion"];

export default projectsData;
