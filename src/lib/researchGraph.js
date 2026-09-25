/*
 * Research graph: an optional root, topics, and publications as a radial
 * node-link graph.
 *
 * `buildGraph` turns publication data into nodes and links. `layoutGraph`
 * places them on concentric ellipses — root at the centre, topics on the inner
 * ring, papers evenly spaced on the outer ring — ordered so each paper sits
 * beside its topics. The layout is deterministic (identical on every load) and
 * needs no dependency. Both functions are pure: they return new objects and
 * never touch their input.
 */

export const ROOT_ID = "root";
const TOPIC_RING = 0.5;
const PAPER_RING = 1;
const MIN_DISTANCE = 44;
const COLLISION_PASSES = 40;
const TOPIC_MIN_GAP = 0.65; // fraction of an even share of the circle
const SPREAD_PASSES = 80;

export const topicNodeId = (topicId) => `topic:${topicId}`;
export const paperNodeId = (paperId) => `paper:${paperId}`;

export function buildGraph(publications, topics, { rootLabel } = {}) {
  const topicById = new Map(topics.map((t) => [t.id, t]));

  publications.forEach((pub) => {
    pub.topics.forEach((topicId) => {
      if (!topicById.has(topicId)) {
        throw new Error(
          `Publication ${pub.id} references unknown topic "${topicId}"`,
        );
      }
    });
  });

  const usedTopicIds = new Set(publications.flatMap((pub) => pub.topics));
  const usedTopics = topics.filter((t) => usedTopicIds.has(t.id));

  const rootNodes = rootLabel
    ? [{ id: ROOT_ID, kind: "root", label: rootLabel }]
    : [];

  const topicNodes = usedTopics.map((t, order) => ({
    id: topicNodeId(t.id),
    kind: "topic",
    label: t.label,
    color: t.color,
    order,
  }));

  const paperNodes = publications.map((pub) => ({
    id: paperNodeId(pub.id),
    kind: "paper",
    label: pub.short,
    name: pub.name,
    paperId: pub.id,
    title: pub.title,
    topics: pub.topics,
  }));

  const rootLinks = rootLabel
    ? usedTopics.map((t) => ({ source: ROOT_ID, target: topicNodeId(t.id) }))
    : [];

  const paperLinks = publications.flatMap((pub) =>
    pub.topics.map((topicId) => ({
      source: topicNodeId(topicId),
      target: paperNodeId(pub.id),
    })),
  );

  return {
    nodes: [...rootNodes, ...topicNodes, ...paperNodes],
    links: [...rootLinks, ...paperLinks],
  };
}

// Position of a paper around the circle, in "topic slots". A paper on topics
// that straddle the wrap-around (last and first topic) is unwrapped first so
// it lands between them rather than on the opposite side.
function paperSlot(paper, topicOrder, topicCount) {
  const slots = paper.topics.map((t) => topicOrder.get(t));
  const spread = Math.max(...slots) - Math.min(...slots);
  const unwrapped =
    spread > topicCount / 2
      ? slots.map((s) => (s < topicCount / 2 ? s + topicCount : s))
      : slots;
  const mean = unwrapped.reduce((a, b) => a + b, 0) / unwrapped.length;
  return mean % topicCount;
}

function circularMean(angles) {
  const x = angles.reduce((s, a) => s + Math.cos(a), 0);
  const y = angles.reduce((s, a) => s + Math.sin(a), 0);
  return Math.atan2(y, x);
}

// Topics that share most of their papers get near-identical mean angles.
// Push neighbours apart until each adjacent pair is at least `minGap` apart.
function spreadAngles(entries, minGap) {
  let current = [...entries].sort((a, b) => a.angle - b.angle);
  const n = current.length;
  if (n < 2) return new Map(current.map((e) => [e.id, e.angle]));

  for (let pass = 0; pass < SPREAD_PASSES; pass += 1) {
    const next = current.map((e) => ({ ...e }));
    for (let i = 0; i < n; i += 1) {
      const j = (i + 1) % n;
      const gap = (next[j].angle - next[i].angle + 4 * Math.PI) % (2 * Math.PI);
      if (gap < minGap) {
        const push = (minGap - gap) / 2;
        next[i].angle -= push;
        next[j].angle += push;
      }
    }
    current = next;
  }
  return new Map(current.map((e) => [e.id, e.angle]));
}

function resolveCollisions(points, fixed, bounds) {
  const clampX = (x) => Math.min(bounds.maxX, Math.max(bounds.minX, x));
  const clampY = (y) => Math.min(bounds.maxY, Math.max(bounds.minY, y));
  let current = points;

  for (let pass = 0; pass < COLLISION_PASSES; pass += 1) {
    const next = current.map((p) => ({ ...p }));
    for (let i = 0; i < next.length; i += 1) {
      for (let j = i + 1; j < next.length; j += 1) {
        const vx = next[i].x - next[j].x;
        const vy = next[i].y - next[j].y;
        const d = Math.max(Math.hypot(vx, vy), 0.01);
        if (d < MIN_DISTANCE) {
          const push = (MIN_DISTANCE - d) / (fixed[i] || fixed[j] ? 1 : 2);
          if (!fixed[i]) {
            next[i].x = clampX(next[i].x + (vx / d) * push);
            next[i].y = clampY(next[i].y + (vy / d) * push);
          }
          if (!fixed[j]) {
            next[j].x = clampX(next[j].x - (vx / d) * push);
            next[j].y = clampY(next[j].y - (vy / d) * push);
          }
        }
      }
    }
    current = next;
  }
  return current;
}

export function layoutGraph(graph, { width, height, padding }) {
  const { nodes, links } = graph;
  const cx = width / 2;
  const cy = height / 2;
  const rx = width / 2 - padding;
  const ry = height / 2 - padding;

  const topics = nodes.filter((n) => n.kind === "topic");
  const topicOrder = new Map(
    topics.map((t) => [t.id.slice("topic:".length), t.order]),
  );

  // Papers: evenly spaced on the outer ring, sorted by topic position.
  const papers = nodes.filter((n) => n.kind === "paper");
  const sortedPapers = papers
    .map((p, i) => ({
      id: p.id,
      slot: paperSlot(p, topicOrder, topics.length),
      i,
    }))
    .sort((a, b) => a.slot - b.slot || a.i - b.i);
  const paperAngle = new Map(
    sortedPapers.map((p, rank) => [
      p.id,
      (2 * Math.PI * rank) / sortedPapers.length - Math.PI / 2,
    ]),
  );

  // Topics: on the inner ring, near the mean angle of their papers.
  const topicAngle = spreadAngles(
    topics.map((t) => ({
      id: t.id,
      angle: circularMean(
        links
          .filter((l) => l.source === t.id && paperAngle.has(l.target))
          .map((l) => paperAngle.get(l.target)),
      ),
    })),
    ((2 * Math.PI) / Math.max(topics.length, 1)) * TOPIC_MIN_GAP,
  );

  const place = (node) => {
    if (node.kind === "root") return { x: cx, y: cy, angle: 0 };
    const ring = node.kind === "topic" ? TOPIC_RING : PAPER_RING;
    const angle = (node.kind === "topic" ? topicAngle : paperAngle).get(
      node.id,
    );
    return {
      x: cx + Math.cos(angle) * rx * ring,
      y: cy + Math.sin(angle) * ry * ring,
      angle,
    };
  };

  const placed = nodes.map(place);
  const resolved = resolveCollisions(
    placed,
    nodes.map((n) => n.kind === "root"),
    {
      minX: padding,
      maxX: width - padding,
      minY: padding,
      maxY: height - padding,
    },
  );

  return {
    nodes: nodes.map((node, i) => ({
      ...node,
      x: resolved[i].x,
      y: resolved[i].y,
      angle: placed[i].angle,
    })),
    links: links.map((link) => ({ ...link })),
  };
}
