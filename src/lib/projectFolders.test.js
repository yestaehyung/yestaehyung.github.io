import {
  buildFolders,
  projectPath,
  projectSlug,
  projectTopics,
} from "./projectFolders";

const topics = [
  { id: "um", label: "User Modeling", color: "#111" },
  { id: "safety", label: "LLM Safety", color: "#222" },
  { id: "empty", label: "Empty", color: "#333" },
];

const publications = [
  { id: 10, topics: ["um"] },
  { id: 8, topics: ["safety", "um"] },
];

const projects = [
  { id: 1, name: "A", publicationId: 10 },
  { id: 2, name: "B", publicationId: 8 },
  { id: 3, name: "C", topics: ["safety"] },
];

describe("projectTopics", () => {
  it("takes topics from the linked publication", () => {
    expect(projectTopics(projects[1], publications)).toEqual(["safety", "um"]);
  });

  it("uses the project's own topics when it has no publication", () => {
    expect(projectTopics(projects[2], publications)).toEqual(["safety"]);
  });

  it("throws when the linked publication does not exist", () => {
    expect(() =>
      projectTopics({ id: 9, name: "X", publicationId: 404 }, publications),
    ).toThrow(/publication 404/);
  });
});

describe("buildFolders", () => {
  it("groups projects by topic in topic order, skipping empty topics", () => {
    const folders = buildFolders(projects, publications, topics);
    expect(folders.map((f) => f.topic.id)).toEqual(["um", "safety"]);
    expect(folders[0].projects.map((p) => p.name)).toEqual(["A", "B"]);
    expect(folders[1].projects.map((p) => p.name)).toEqual(["B", "C"]);
  });

  it("puts ongoing projects first inside a folder", () => {
    const folders = buildFolders(
      [...projects, { id: 4, name: "D", topics: ["um"], status: "ongoing" }],
      publications,
      topics,
    );
    expect(folders[0].projects.map((p) => p.name)).toEqual(["D", "A", "B"]);
  });

  it("throws on an unknown topic id", () => {
    expect(() =>
      buildFolders([{ id: 5, name: "E", topics: ["nope"] }], [], topics),
    ).toThrow(/unknown topic "nope"/);
  });

  it("does not mutate its input", () => {
    const before = JSON.stringify(projects);
    buildFolders(projects, publications, topics);
    expect(JSON.stringify(projects)).toBe(before);
  });
});

describe("projectSlug", () => {
  it("lowercases and hyphenates the project name", () => {
    expect(projectSlug({ name: "TRIPLE (AAAI)" })).toBe("triple-aaai");
    expect(projectSlug({ name: "Fashion-FINE" })).toBe("fashion-fine");
  });
});

describe("projectPath", () => {
  it("opens the project inside its first topic folder, in topic order", () => {
    expect(projectPath(projects[1], publications, topics)).toBe(
      "/projects?folder=um&project=b",
    );
  });
});
