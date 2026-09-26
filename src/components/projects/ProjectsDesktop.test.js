import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import ProjectsDesktop from "./ProjectsDesktop";

const LocationProbe = () => {
  const { search } = useLocation();
  return <output data-testid="search">{search}</output>;
};

const renderAt = (url = "/projects") =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <ProjectsDesktop />
      <LocationProbe />
    </MemoryRouter>,
  );

const openFolder = (label) =>
  fireEvent.click(screen.getByRole("button", { name: `${label} folder` }));

const search = () => screen.getByTestId("search").textContent;

describe("ProjectsDesktop", () => {
  it("shows one folder per topic that has projects", () => {
    renderAt();
    expect(
      screen.getByRole("button", { name: "User Modeling folder" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "AI Platforms folder" }),
    ).toBeInTheDocument();
  });

  it("opens a Finder window listing the folder's projects", () => {
    renderAt();
    openFolder("User Modeling");
    const finder = screen.getByRole("dialog", { name: "User Modeling" });
    expect(
      within(finder).getByRole("button", { name: /PALETTE/ }),
    ).toBeInTheDocument();
    expect(
      within(finder).getByRole("button", { name: /TRIPLE \(AAAI\)/ }),
    ).toBeInTheDocument();
  });

  it("opens a project window with its description and links", () => {
    renderAt();
    openFolder("User Modeling");
    fireEvent.click(screen.getByRole("button", { name: /PADO/ }));
    const detail = screen.getByRole("dialog", { name: "PADO" });
    expect(within(detail).getByText(/multi-agent system/)).toBeInTheDocument();
    expect(
      within(detail).getByRole("link", { name: /Project Page/ }),
    ).toHaveAttribute("href", "https://taehyungnoh.com/coling25-pado/");
  });

  it("hides a placeholder role", () => {
    renderAt();
    openFolder("AI Platforms");
    fireEvent.click(
      screen.getByRole("button", { name: /Industrial AI Platform/ }),
    );
    const detail = screen.getByRole("dialog", {
      name: "Industrial AI Platform",
    });
    expect(within(detail).queryByText("...")).toBeNull();
    expect(within(detail).getByText("Ongoing")).toBeInTheDocument();
  });

  it("closes the topmost window on Escape", () => {
    renderAt();
    openFolder("User Modeling");
    fireEvent.click(screen.getByRole("button", { name: /PADO/ }));

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "PADO" })).toBeNull();
    expect(
      screen.getByRole("dialog", { name: "User Modeling" }),
    ).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes a window with its close button", () => {
    renderAt();
    openFolder("LLM Safety");
    fireEvent.click(screen.getByRole("button", { name: "Close LLM Safety" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("switches folders from the Finder sidebar", () => {
    renderAt();
    openFolder("User Modeling");
    const finder = screen.getByRole("dialog", { name: "User Modeling" });
    fireEvent.click(within(finder).getByRole("button", { name: "Multimodal" }));
    expect(
      screen.getByRole("dialog", { name: "Multimodal" }),
    ).toBeInTheDocument();
  });

  describe("URL", () => {
    it("records the open folder and project in the address", () => {
      renderAt();
      openFolder("User Modeling");
      expect(search()).toBe("?folder=um");
      fireEvent.click(screen.getByRole("button", { name: /PADO/ }));
      expect(search()).toBe("?folder=um&project=pado");
    });

    it("opens the folder and project named in the address", () => {
      renderAt("/projects?folder=um&project=pado");
      expect(
        screen.getByRole("dialog", { name: "User Modeling" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("dialog", { name: "PADO" })).toBeInTheDocument();
    });

    it("ignores an unknown folder or project", () => {
      renderAt("/projects?folder=nope&project=missing");
      expect(screen.queryByRole("dialog")).toBeNull();
    });

    it("finds the folder when only the project is given", () => {
      renderAt("/projects?project=pado");
      expect(screen.getByRole("dialog", { name: "PADO" })).toBeInTheDocument();
    });
  });

  describe("windows", () => {
    it("brings a clicked window to the front", () => {
      renderAt("/projects?folder=um&project=pado");
      const finder = screen.getByRole("dialog", { name: "User Modeling" });
      const detail = screen.getByRole("dialog", { name: "PADO" });
      expect(detail).toHaveClass("is-front");
      fireEvent.pointerDown(finder);
      expect(finder).toHaveClass("is-front");
      expect(detail).not.toHaveClass("is-front");
    });

    it("maximizes and restores with the green button", () => {
      renderAt("/projects?folder=um");
      const finder = screen.getByRole("dialog", { name: "User Modeling" });
      fireEvent.click(
        screen.getByRole("button", { name: "Maximize User Modeling" }),
      );
      expect(finder).toHaveClass("is-maximized");
      fireEvent.click(
        screen.getByRole("button", { name: "Restore User Modeling" }),
      );
      expect(finder).not.toHaveClass("is-maximized");
    });

    it("maximizes on a title bar double-click", () => {
      renderAt("/projects?folder=um");
      const finder = screen.getByRole("dialog", { name: "User Modeling" });
      fireEvent.doubleClick(within(finder).getByText("User Modeling", {
        selector: "h3",
      }));
      expect(finder).toHaveClass("is-maximized");
    });
  });

  it("has a Dock with the main links", () => {
    renderAt();
    const dock = screen.getByRole("navigation", { name: "Dock" });
    expect(within(dock).getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/yestaehyung",
    );
    expect(within(dock).getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
