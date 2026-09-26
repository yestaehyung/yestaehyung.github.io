/*
 * Groups projects into topic folders for the Projects desktop.
 *
 * A project linked to a publication (`publicationId`) inherits that paper's
 * topics, so the folders, the ResearchGraph and the topic chips can never
 * disagree. Projects without a paper carry their own `topics`. Pure: returns
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
