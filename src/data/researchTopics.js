/*
 * Topic nodes for the ResearchGraph. Publications reference these by `id` in
 * their `topics` array (src/data/publicationsData.js). A topic no publication
 * uses is simply not drawn, so project-only topics (e.g. AI Platforms, used
 * by the Projects desktop) do not appear on the graph.
 *
 * Order matters: topics are laid out clockwise around the centre in this
 * order, so topics that share papers should sit next to each other.
 */
const researchTopics = [
  { id: "um", label: "User Modeling", color: "#2563eb" },
  { id: "health", label: "Mental Health", color: "#0f766e" },
  { id: "multimodal", label: "Multimodal", color: "#4b5563" },
  { id: "recsys", label: "Recommender Systems", color: "#a16207" },
  { id: "hai", label: "Human–AI Interaction", color: "#be185d" },
  { id: "safety", label: "LLM Safety", color: "#c2410c" },
  { id: "values", label: "Human Values", color: "#7c3aed" },
  { id: "platform", label: "AI Platforms", color: "#0e7490" },
];

export default researchTopics;
