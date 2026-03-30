const SECTION_PRIORITY = [
  "motivation",
  "results",
  "discussion",
  "background",
  "objectives",
  "gap",
];

function firstSentence(text) {
  if (!text) return "";

  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return "";

  const match = normalized.match(/(.+?[.!?]|.+?$)/);
  return (match?.[1] || normalized).trim();
}

function preferredSectionText(post, keys) {
  for (const key of keys) {
    const value = post?.sections?.[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

export function buildLeadSummary(post) {
  const preferred = preferredSectionText(post, ["motivation", "results", "discussion"]);
  const sentence = firstSentence(preferred);
  return sentence || firstSentence(preferredSectionText(post, SECTION_PRIORITY));
}

export function pickPullQuote(post) {
  const preferred = preferredSectionText(post, ["motivation", "discussion", "results"]);
  return firstSentence(preferred || buildLeadSummary(post));
}

export function buildSpotlightItems(post) {
  const items = [];

  if (post?.venue) items.push(post.venue);
  if (Array.isArray(post?.tags)) {
    items.push(...post.tags.slice(0, 2));
  }

  return items;
}
