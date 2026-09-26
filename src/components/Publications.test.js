import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Publications, { publicationAnchorId } from "./Publications";

const inRouter = (ui) => <MemoryRouter>{ui}</MemoryRouter>;

describe("Publications focus from the research graph", () => {
  it("highlights the requested paper", () => {
    const { container } = render(inRouter(<Publications focusRequest={{ id: 10 }} />));
    expect(container.querySelector(`#${publicationAnchorId(10)}`)).toHaveClass(
      "is-highlighted",
    );
  });

  it("clears a filter that would hide the requested paper", () => {
    const { container, rerender } = render(inRouter(<Publications />));
    fireEvent.click(screen.getByRole("button", { name: "Journal" }));
    expect(container.querySelector(`#${publicationAnchorId(10)}`)).toBeNull();

    rerender(inRouter(<Publications focusRequest={{ id: 10 }} />));
    expect(
      container.querySelector(`#${publicationAnchorId(10)}`),
    ).not.toBeNull();
  });

  it("shows the paper's research topics as chips", () => {
    const { container } = render(inRouter(<Publications />));
    const chips = [
      ...container.querySelectorAll(`#${publicationAnchorId(8)} .topic-chip`),
    ].map((c) => c.textContent);
    expect(chips).toEqual(["Human–AI Interaction", "LLM Safety"]);
  });
});

describe("Publications links into the Projects desktop", () => {
  it("links a paper that has a project to its Projects window", () => {
    const { container } = render(inRouter(<Publications />));
    const pado = container.querySelector(`#${publicationAnchorId(5)}`);
    const link = [...pado.querySelectorAll("a")].find(
      (a) => a.textContent === "Details",
    );
    expect(link).toHaveAttribute("href", "/projects?folder=um&project=pado");
  });
});
