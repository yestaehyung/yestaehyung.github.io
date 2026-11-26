/*
 * Topic helpers for the /projects research list.
 *
 * A project linked to a publication (`publicationId`) inherits that paper's
 * topics, so the topic filters, the ResearchGraph and the topic chips can
 * never disagree. Projects without a paper carry their own `topics`. Pure: returns
 * new arrays and never touches its input.
 */

export function projectTopics(project, publications) {
  if (project.publicationId === undefined) return project.topics || [];
  const publication = publications.find((p) => p.id === project.publicationId);
  if (!publication) {
    throw new Error(
      `Project ${project.id} links to publication ${project.publicationId}, which does not exist`,
    );
  }
  return publication.topics;
}

const ongoingFirst = (a, b) =>
  Number(b.status === "ongoing") - Number(a.status === "ongoing");

export function buildFolders(projects, publications, topics) {
  const knownIds = new Set(topics.map((t) => t.id));
  const tagged = projects.map((project) => {
    const ids = projectTopics(project, publications);
    ids.forEach((id) => {
      if (!knownIds.has(id)) {
        throw new Error(`Project ${project.id} references unknown topic "${id}"`);
      }
    });
    return { project, ids };
  });

  return topics
    .map((topic) => ({
      topic,
      projects: tagged
        .filter(({ ids }) => ids.includes(topic.id))
        .map(({ project }) => project)
        .sort(ongoingFirst),
    }))
    .filter((folder) => folder.projects.length > 0);
}

// URL-safe id for a project, e.g. "TRIPLE (AAAI)" -> "triple-aaai".
export const projectSlug = (project) =>
  project.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Link to a project's card on /projects. Older links also carried
// `folder=<topic>` from the former desktop; the list ignores it.
export const projectPath = (project) =>
  `/projects?${new URLSearchParams({ project: projectSlug(project) })}`;
