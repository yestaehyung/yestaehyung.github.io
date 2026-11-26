import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProjectsList, { projectAnchorId } from "./ProjectsList";
import projectsData from "../data/projectsData";

const renderAt = (url = "/projects") =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <ProjectsList />
    </MemoryRouter>,
  );

const byName = (name) => projectsData.find((p) => p.name === name);
const card = (container, name) =>
  container.querySelector(`#${projectAnchorId(byName(name))}`);

describe("ProjectsList", () => {
  it("lists every project", () => {
    const { container } = renderAt();
    expect(container.querySelectorAll(".pl-card")).toHaveLength(
      projectsData.length,
    );
  });

  it("links a project's headline to its static page with a plain anchor", () => {
    const { container } = renderAt();
    const pado = card(container, "PADO");
    const link = within(pado).getByRole("link", {
      name: /comparing two opposing AI agents/,
    });
    expect(link).toHaveAttribute("href", "/coling25-pado/");
    expect(link).not.toHaveAttribute("target");
  });

  it("keeps a project's other links but not a duplicate Project Page", () => {
    const { container } = renderAt();
    const pado = card(container, "PADO");
    expect(within(pado).getByRole("link", { name: "Paper" })).toHaveAttribute(
      "href",
      "https://aclanthology.org/2025.coling-main.382/",
    );
    expect(within(pado).queryByRole("link", { name: "Project Page" })).toBeNull();
  });

  it("filters by topic", () => {
    const { container } = renderAt();
    fireEvent.click(screen.getByRole("button", { name: "AI Platforms" }));
    expect(container.querySelectorAll(".pl-card")).toHaveLength(1);
    expect(card(container, "Industrial AI Platform")).not.toBeNull();
  });

  it("hides a placeholder role", () => {
    const { container } = renderAt();
    const platform = card(container, "Industrial AI Platform");
    expect(platform.querySelector(".pl-role")).toBeNull();
  });

  it("highlights the card an older desktop link points to", () => {
    const { container } = renderAt("/projects?folder=hai&project=llm-deception");
    expect(card(container, "LLM Deception")).toHaveClass("is-highlighted");
  });

  it("never lets a topic filter hide the linked card", () => {
    const { container } = renderAt("/projects?topic=platform&project=mos");
    expect(card(container, "MOS")).toHaveClass("is-highlighted");
    expect(container.querySelectorAll(".pl-card")).toHaveLength(
      projectsData.length,
    );
  });
});
