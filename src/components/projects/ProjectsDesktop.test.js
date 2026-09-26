import { render, screen, fireEvent, within } from "@testing-library/react";
import ProjectsDesktop from "./ProjectsDesktop";

const openFolder = (label) =>
  fireEvent.click(screen.getByRole("button", { name: `${label} folder` }));

describe("ProjectsDesktop", () => {
  it("shows one folder per topic that has projects", () => {
    render(<ProjectsDesktop />);
    expect(
      screen.getByRole("button", { name: "User Modeling folder" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "AI Platforms folder" }),
    ).toBeInTheDocument();
  });

  it("opens a Finder window listing the folder's projects", () => {
    render(<ProjectsDesktop />);
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
    render(<ProjectsDesktop />);
    openFolder("User Modeling");
    fireEvent.click(screen.getByRole("button", { name: /PADO/ }));
    const detail = screen.getByRole("dialog", { name: "PADO" });
    expect(within(detail).getByText(/multi-agent system/)).toBeInTheDocument();
    expect(
      within(detail).getByRole("link", { name: /Project Page/ }),
    ).toHaveAttribute("href", "https://taehyungnoh.com/coling25-pado/");
  });

  it("hides a placeholder role", () => {
    render(<ProjectsDesktop />);
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
    render(<ProjectsDesktop />);
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
    render(<ProjectsDesktop />);
    openFolder("LLM Safety");
    fireEvent.click(screen.getByRole("button", { name: "Close LLM Safety" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("switches folders from the Finder sidebar", () => {
    render(<ProjectsDesktop />);
    openFolder("User Modeling");
    const finder = screen.getByRole("dialog", { name: "User Modeling" });
    fireEvent.click(within(finder).getByRole("button", { name: "Multimodal" }));
    expect(
      screen.getByRole("dialog", { name: "Multimodal" }),
    ).toBeInTheDocument();
  });
});
