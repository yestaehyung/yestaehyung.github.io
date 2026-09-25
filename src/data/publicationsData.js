/*
 * Publications, newest first. Consumed by the Publications list and the
 * ResearchGraph. `name` (framework or short keyword) and `short` (venue)
 * label the graph node; `topics` are ids from
 * researchTopics.js and decide which topic nodes a paper connects to.
 * Bold author (isAuthor) = this author.
 */
const publicationsData = [
  {
    id: 10,
    name: "Dynamic Context",
    short: "NeurIPS ’26",
    topics: ["um", "health"],
    title:
      "Dynamic Context Modeling for Longitudinal Mental Health Monitoring under Distribution Shift",
    authors: [
      { name: "Seungwan Jin", isAuthor: false },
      { name: "Taehyung Noh", isAuthor: true },
      { name: "Junghyun Kim", isAuthor: false },
      { name: "Uichin Lee", isAuthor: false },
      { name: "Kyungsik Han", isAuthor: false },
    ],
    venue: "NeurIPS 2026",
    type: "conference",
    image: null,
    links: [],
  },
  {
    id: 9,
    name: "PALETTE",
    short: "CIKM ’26",
    topics: ["um", "values"],
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
    name: "LLM Deception",
    short: "CHI ’26",
    topics: ["safety", "hai"],
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
    name: "TRIPLE",
    short: "AAAI ’26",
    topics: ["um"],
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
    name: "TRIPLE",
    short: "CIKM ’25",
    topics: ["um"],
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
    name: "LLM Explanations",
    short: "Fashion & Textiles",
    topics: ["recsys", "hai"],
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
    name: "LLM Attacks",
    short: "TTA ’25",
    topics: ["safety"],
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
    name: "PADO",
    short: "COLING ’25",
    topics: ["um"],
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
    name: "Fashion-FINE",
    short: "ECCV ’24",
    topics: ["multimodal"],
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
    name: "MOS",
    short: "CHI LBW ’23",
    topics: ["recsys", "hai"],
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

export default publicationsData;
