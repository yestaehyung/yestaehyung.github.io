import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/ProjectsList.css";
import projectsData from "../data/projectsData";
import publicationsData from "../data/publicationsData";
import researchTopics from "../data/researchTopics";
import { buildFolders, projectSlug, projectTopics } from "../lib/projectFolders";

const HIGHLIGHT_MS = 2200;

// Roles like "..." are placeholders in projectsData and are not shown.
const hasRole = (role) => Boolean(role) && /\w/.test(role);

export const projectAnchorId = (project) => `project-${projectSlug(project)}`;

const publicationOf = (project) =>
  publicationsData.find((p) => p.id === project.publicationId) || null;

// Links other than the project's own page, which the headline already opens.
const extraLinks = (project) =>
  (project.links || []).filter(
    (link) => !(project.page && link.text === "Project Page"),
  );

const ProjectCard = ({ project, isHighlighted }) => {
  const publication = publicationOf(project);
  const topicIds = projectTopics(project, publicationsData);
  const topics = researchTopics.filter((t) => topicIds.includes(t.id));
  const ongoing = project.status === "ongoing";
  const headline = project.headline || project.title;
  const links = extraLinks(project);

  return (
    <li
      id={projectAnchorId(project)}
      className={`pl-card ${isHighlighted ? "is-highlighted" : ""}`}
    >
      <p className="pl-meta">
        <span className="pl-venue">
          {publication ? publication.short : ongoing ? "Ongoing" : "Project"}
        </span>
        <span className="pl-name">{project.name}</span>
      </p>
      <div className="pl-body">
        <ul className="pl-topics" aria-label="Topics">
          {topics.map((t) => (
            <li key={t.id} style={{ "--topic-color": t.color }}>
              {t.label}
            </li>
          ))}
        </ul>
        <h2 className="pl-headline">
          {project.page ? <a href={project.page}>{headline}</a> : headline}
        </h2>
        {publication && project.headline && (
          <p className="pl-paper">{publication.title}</p>
        )}
        <p className="pl-desc">{project.description}</p>
        <div className="pl-footer">
          {hasRole(project.role) && (
            <span className="pl-role">{project.role}</span>
          )}
          {project.page && (
            <a className="pl-read" href={project.page}>
              Read more <span aria-hidden="true">→</span>
            </a>
          )}
          {links.map((link) => (
            <a
              key={link.url}
              className="pl-link"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </li>
  );
};

// Projects page: a research-article index, one card per project, filterable
// by topic. `?project=<slug>` (also the older `?folder=…&project=…` desktop
// links) shows every project and scrolls to and flashes that card.
const ProjectsList = () => {
  const [params, setParams] = useSearchParams();
  const folders = useMemo(
    () => buildFolders(projectsData, publicationsData, researchTopics),
    [],
  );
  const focusSlug = params.get("project");
  const focused = projectsData.find((p) => projectSlug(p) === focusSlug);
  const topicParam = params.get("topic");
  const activeTopic =
    !focused && folders.some((f) => f.topic.id === topicParam)
      ? topicParam
      : "all";

  const shown =
    activeTopic === "all"
      ? projectsData
      : projectsData.filter((p) =>
          projectTopics(p, publicationsData).includes(activeTopic),
        );

  // Warm page background, matching the paper pages, only while mounted.
  useEffect(() => {
    document.body.dataset.page = "projects";
    return () => {
      delete document.body.dataset.page;
    };
  }, []);

  useEffect(() => {
    if (!focused) return undefined;
    const el = document.getElementById(projectAnchorId(focused));
    if (el && el.scrollIntoView) el.scrollIntoView({ block: "start" });
    const timer = setTimeout(() => setParams({}, { replace: true }), HIGHLIGHT_MS);
    return () => clearTimeout(timer);
  }, [focused, setParams]);

  const selectTopic = (id) => setParams(id === "all" ? {} : { topic: id });

  return (
    <section className="projects-list" aria-labelledby="projects-title">
      <header className="pl-intro">
        <h1 id="projects-title">Projects</h1>
        <p className="pl-deck">
          Papers and projects I've worked on, newest first.
        </p>
      </header>
      <div className="pl-filters" role="group" aria-label="Filter by topic">
        {[{ id: "all", label: "All" }, ...folders.map((f) => f.topic)].map(
          (t) => (
            <button
              key={t.id}
              type="button"
              className={`pl-filter ${activeTopic === t.id ? "is-active" : ""}`}
              aria-pressed={activeTopic === t.id}
              onClick={() => selectTopic(t.id)}
            >
              {t.label}
            </button>
          ),
        )}
      </div>
      <ol className="pl-cards">
        {shown.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isHighlighted={focused?.id === project.id}
          />
        ))}
      </ol>
    </section>
  );
};

export default ProjectsList;
