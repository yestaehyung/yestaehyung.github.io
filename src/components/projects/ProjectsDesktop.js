import React, { useEffect, useMemo, useState } from "react";
import "../../styles/ProjectsDesktop.css";
import projectsData from "../../data/projectsData";
import publicationsData from "../../data/publicationsData";
import researchTopics from "../../data/researchTopics";
import { buildFolders } from "../../lib/projectFolders";
import MenuBar from "./MenuBar";
import FolderIcon from "./FolderIcon";
import FinderWindow from "./FinderWindow";
import ProjectWindow from "./ProjectWindow";

// Projects page as a macOS-style desktop: topic folders on a wallpaper; a
// folder opens a Finder window of project files; a file opens its details.
const ProjectsDesktop = () => {
  const folders = useMemo(
    () => buildFolders(projectsData, publicationsData, researchTopics),
    [],
  );
  const [openTopicId, setOpenTopicId] = useState(null);
  const [openProjectId, setOpenProjectId] = useState(null);

  const folder = folders.find((f) => f.topic.id === openTopicId) || null;
  const project =
    folder?.projects.find((p) => p.id === openProjectId) || null;

  const closeFinder = () => {
    setOpenProjectId(null);
    setOpenTopicId(null);
  };

  const selectFolder = (topicId) => {
    setOpenProjectId(null);
    setOpenTopicId(topicId);
  };

  // Escape closes only the topmost window.
  useEffect(() => {
    if (!folder) return undefined;
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (project) setOpenProjectId(null);
      else closeFinder();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [folder, project]);

  return (
    <section className="projects-desktop" aria-labelledby="projects-title">
      <h2 id="projects-title" className="pd-heading">
        Projects
      </h2>
      <div className="pd-screen">
        <MenuBar activeTitle={project?.name || folder?.topic.label} />
        <div className="pd-desktop">
          <div className="pd-folders">
            {folders.map(({ topic, projects }) => (
              <FolderIcon
                key={topic.id}
                topic={topic}
                count={projects.length}
                isOpen={topic.id === openTopicId}
                onOpen={() => selectFolder(topic.id)}
              />
            ))}
          </div>
          {folder && (
            <FinderWindow
              folders={folders}
              folder={folder}
              onSelectFolder={selectFolder}
              onOpenProject={setOpenProjectId}
              onClose={closeFinder}
            />
          )}
          {project && (
            <ProjectWindow
              key={project.id}
              project={project}
              color={folder.topic.color}
              onClose={() => setOpenProjectId(null)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsDesktop;
