import { buildGraph, layoutGraph } from "./researchGraph";

const topics = [
  { id: "um", label: "User Modeling", color: "#111" },
  { id: "safety", label: "LLM Safety", color: "#222" },
];

const publications = [
  { id: 1, short: "A", topics: ["um"] },
  { id: 2, short: "B", topics: ["um", "safety"] },
  { id: 3, short: "C", topics: ["safety"] },
];

describe("buildGraph", () => {
  it("creates one node per topic and per publication", () => {
    const { nodes } = buildGraph(publications, topics);
    expect(nodes.filter((n) => n.kind === "topic")).toHaveLength(2);
    expect(nodes.filter((n) => n.kind === "paper")).toHaveLength(3);
  });

  it("links each publication to every one of its topics", () => {
    const { links } = buildGraph(publications, topics);
    expect(links).toEqual(
      expect.arrayContaining([
        { source: "topic:um", target: "paper:1" },
        { source: "topic:um", target: "paper:2" },
        { source: "topic:safety", target: "paper:2" },
        { source: "topic:safety", target: "paper:3" },
      ]),
    );
    expect(links).toHaveLength(4);
  });

  it("drops topics that no publication uses", () => {
    const { nodes } = buildGraph(publications, [
      ...topics,
      { id: "unused", label: "Unused", color: "#333" },
    ]);
    expect(nodes.find((n) => n.id === "topic:unused")).toBeUndefined();
  });

  it("optionally adds a root node linked to every topic", () => {
    const { nodes, links } = buildGraph(publications, topics, {
      rootLabel: "Research",
    });
    expect(nodes.find((n) => n.kind === "root")).toMatchObject({
      label: "Research",
    });
    expect(links.filter((l) => l.source === "root")).toHaveLength(2);
  });

  it("throws on a publication that references an unknown topic", () => {
    expect(() =>
      buildGraph([{ id: 9, short: "X", topics: ["nope"] }], topics),
    ).toThrow(/unknown topic "nope"/);
  });
});

describe("layoutGraph", () => {
  const graph = buildGraph(publications, topics, { rootLabel: "Research" });
  const size = { width: 600, height: 400, padding: 40 };

  it("gives every node a position inside the padded box", () => {
    const { nodes } = layoutGraph(graph, size);
    nodes.forEach((n) => {
      expect(n.x).toBeGreaterThanOrEqual(size.padding);
      expect(n.x).toBeLessThanOrEqual(size.width - size.padding);
      expect(n.y).toBeGreaterThanOrEqual(size.padding);
      expect(n.y).toBeLessThanOrEqual(size.height - size.padding);
    });
  });

  it("is deterministic", () => {
    expect(layoutGraph(graph, size)).toEqual(layoutGraph(graph, size));
  });

  it("does not mutate the input graph", () => {
    const before = JSON.stringify(graph);
    layoutGraph(graph, size);
    expect(JSON.stringify(graph)).toBe(before);
  });

  it("puts the root at the centre and papers further out than topics", () => {
    const { nodes } = layoutGraph(graph, size);
    const root = nodes.find((n) => n.kind === "root");
    expect(root).toMatchObject({ x: 300, y: 200 });
    const dist = (n) => Math.hypot((n.x - 300) / 300, (n.y - 200) / 200);
    const maxTopic = Math.max(
      ...nodes.filter((n) => n.kind === "topic").map(dist),
    );
    const minPaper = Math.min(
      ...nodes.filter((n) => n.kind === "paper").map(dist),
    );
    expect(minPaper).toBeGreaterThan(maxTopic);
  });

  it("keeps nodes from overlapping", () => {
    const { nodes } = layoutGraph(graph, size);
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        expect(d).toBeGreaterThan(30);
      }
    }
  });
});
