import { useSearchParams } from "react-router-dom";
import { projectSlug } from "../../lib/projectFolders";

// The open folder and project live in the URL (?folder=um&project=pado), so a
// window can be linked to and the browser's Back button closes it. Unknown
// ids are ignored; a project given without a folder opens in its first folder.
export function useDesktopRoute(folders) {
  const [params, setParams] = useSearchParams();
  const folderParam = params.get("folder");
  const projectParam = params.get("project");

  const hasProject = (f) =>
    f.projects.some((p) => projectSlug(p) === projectParam);
  const folder =
    folders.find((f) => f.topic.id === folderParam) ||
    (projectParam && !folderParam ? folders.find(hasProject) : null) ||
    null;
  const project =
    folder?.projects.find((p) => projectSlug(p) === projectParam) || null;

  const openFolder = (topicId) => setParams({ folder: topicId });
  const openProject = (p) =>
    setParams({ folder: folder.topic.id, project: projectSlug(p) });
  const closeProject = () => setParams({ folder: folder.topic.id });
  const closeFolder = () => setParams({});

  return { folder, project, openFolder, openProject, closeProject, closeFolder };
}
