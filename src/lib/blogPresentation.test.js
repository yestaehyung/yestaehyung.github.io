import {
  buildLeadSummary,
  pickPullQuote,
  buildSpotlightItems,
} from "./blogPresentation";

const post = {
  title: "Example paper",
  venue: "ICML 2026",
  tags: ["LLM Personalization", "Preference Learning", "DPO"],
  sections: {
    background: "Background sentence.",
    motivation: "Motivation sentence with the strongest framing.",
    results: "Results sentence.",
    discussion: "Discussion sentence.",
  },
};

describe("blogPresentation helpers", () => {
  test("buildLeadSummary prefers motivation and results content", () => {
    expect(buildLeadSummary(post)).toMatch(/Motivation sentence|Results sentence/);
  });

  test("pickPullQuote returns a short sentence-sized emphasis line", () => {
    expect(pickPullQuote(post).length).toBeGreaterThan(10);
  });

  test("buildSpotlightItems returns compact metadata strings", () => {
    expect(buildSpotlightItems(post)).toContain("ICML 2026");
  });
});
