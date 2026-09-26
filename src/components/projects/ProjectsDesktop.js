import React, { useEffect, useMemo, useState } from "react";
import "../../styles/ProjectsDesktop.css";
import projectsData from "../../data/projectsData";
import publicationsData from "../../data/publicationsData";
import researchTopics from "../../data/researchTopics";
import { buildFolders } from "../../lib/projectFolders";
import { useDesktopRoute } from "./useDesktopRoute";
import MenuBar from "./MenuBar";
import FolderIcon from "./FolderIcon";
import FinderWindow from "./FinderWindow";
import ProjectWindow from "./ProjectWindow";
import Dock from "./Dock";

// Projects page as a macOS-style desktop: topic folders on a wallpaper; a
// folder opens a Finder window of project files; a file opens its details.
const ProjectsDesktop = () => {
  const folders = useMemo(
    () => buildFolders(projectsData, publicationsData, researchTopics),
    [],
  );
  const { folder, project, openFolder, openProject, closeProject, closeFolder } =
    useDesktopRoute(folders);

  // Which window is in front. A newly opened project window starts in front.
  const [front, setFront] = useState("project");
  const projectKey = project?.id;
  useEffect(() => {
    if (projectKey !== undefined) setFront("project");
  }, [projectKey]);
  const finderInFront = !project || front === "finder";

  // Escape closes only the topmost window.
  useEffect(() => {
    if (!folder) return undefined;
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (project) closeProject();
      else closeFolder();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <section className="projects-desktop" aria-labelledby="projects-title">
      <h2 id="projects-title" className="pd-heading">
        Projects
      </h2>
      <div className={`pd-screen ${folder ? "has-window" : ""}`}>
        <MenuBar activeTitle={project?.name || folder?.topic.label} />
        <div className="pd-desktop">
          <div className="pd-folders">
            {folders.map(({ topic, projects }) => (
              <FolderIcon
                key={topic.id}
                topic={topic}
                count={projects.length}
                isOpen={topic.id === folder?.topic.id}
                onOpen={() => openFolder(topic.id)}
              />
            ))}
          </div>
          {folder && (
            <FinderWindow
              folders={folders}
              folder={folder}
              isFront={finderInFront}
              onActivate={() => setFront("finder")}
              onSelectFolder={openFolder}
              onOpenProject={openProject}
              onClose={closeFolder}
            />
          )}
          {project && (
            <ProjectWindow
              key={project.id}
              project={project}
              color={folder.topic.color}
              isFront={!finderInFront}
              onActivate={() => setFront("project")}
              onClose={closeProject}
            />
          )}
          <Dock />
        </div>
      </div>
    </section>
  );
};

export default ProjectsDesktop;
