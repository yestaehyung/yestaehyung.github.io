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
    motivation:
      "현재 LLM 연구는 **선호의 일관성(preference consistency)**과 **행동적 결과(behavioral consequences)**를 분리하며 다룬다.",
    results: "Results sentence.",
    discussion: "Discussion sentence.",
  },
};

describe("blogPresentation helpers", () => {
  test("buildLeadSummary strips inline markdown from the preferred sentence", () => {
    expect(buildLeadSummary(post)).toBe(
      "현재 LLM 연구는 선호의 일관성(preference consistency)과 행동적 결과(behavioral consequences)를 분리하며 다룬다."
    );
  });

  test("pickPullQuote returns a short sentence-sized emphasis line", () => {
    expect(pickPullQuote(post).length).toBeGreaterThan(10);
  });

  test("buildSpotlightItems returns compact metadata strings", () => {
    expect(buildSpotlightItems(post)).toContain("ICML 2026");
  });
});
