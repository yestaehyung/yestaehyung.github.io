import { render, screen, fireEvent } from "@testing-library/react";
import ResearchGraph from "./ResearchGraph";

const topics = [
  { id: "um", label: "User Modeling", color: "#111" },
  { id: "safety", label: "LLM Safety", color: "#222" },
];

const publications = [
  {
    id: 1,
    short: "AAAI ’26",
    title: "Paper One",
    venue: "AAAI 2026",
    topics: ["um"],
  },
  {
    id: 2,
    short: "CHI ’26",
    title: "Paper Two",
    venue: "CHI 2026",
    topics: ["safety"],
  },
];

const renderGraph = (onSelectPaper = jest.fn()) => {
  render(
    <ResearchGraph
      publications={publications}
      topics={topics}
      onSelectPaper={onSelectPaper}
    />,
  );
  return onSelectPaper;
};

describe("ResearchGraph", () => {
  it("renders a node for every topic and paper", () => {
    renderGraph();
    expect(
      screen.getByRole("button", { name: /User Modeling/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Paper One/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Paper Two/ }),
    ).toBeInTheDocument();
  });

  it("selects a paper on click", () => {
    const onSelectPaper = renderGraph();
    fireEvent.click(screen.getByRole("button", { name: /Paper Two/ }));
    expect(onSelectPaper).toHaveBeenCalledWith(2);
  });

  it("selects a paper with the keyboard", () => {
    const onSelectPaper = renderGraph();
    fireEvent.keyDown(screen.getByRole("button", { name: /Paper One/ }), {
      key: "Enter",
    });
    expect(onSelectPaper).toHaveBeenCalledWith(1);
  });

  it("dims papers outside the active topic", () => {
    renderGraph();
    fireEvent.mouseEnter(screen.getByRole("button", { name: /User Modeling/ }));
    expect(screen.getByRole("button", { name: /Paper Two/ })).toHaveClass(
      "is-dimmed",
    );
    expect(screen.getByRole("button", { name: /Paper One/ })).not.toHaveClass(
      "is-dimmed",
    );
  });

  it("describes the hovered paper in the caption", () => {
    renderGraph();
    fireEvent.mouseEnter(screen.getByRole("button", { name: /Paper One/ }));
    expect(screen.getByText("Paper One")).toBeInTheDocument();
  });

  describe("pinning", () => {
    const originalMatchMedia = window.matchMedia;

    const mockPointer = ({ canHover }) => {
      window.matchMedia = jest.fn((query) => ({
        matches: query.includes("hover: hover") ? canHover : false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }));
    };

    afterEach(() => {
      window.matchMedia = originalMatchMedia;
    });

    const paperTwo = () => screen.getByRole("button", { name: /Paper Two/ });
    const userModeling = () =>
      screen.getByRole("button", { name: /User Modeling/ });

    it("does not pin a topic on click when the device can hover", () => {
      mockPointer({ canHover: true });
      renderGraph();
      fireEvent.click(userModeling());
      fireEvent.mouseLeave(userModeling());
      fireEvent.blur(userModeling());
      expect(paperTwo()).not.toHaveClass("is-dimmed");
    });

    it("pins a topic on tap on touch devices", () => {
      mockPointer({ canHover: false });
      renderGraph();
      fireEvent.click(userModeling());
      expect(paperTwo()).toHaveClass("is-dimmed");
    });

    it("ignores emulated hover on touch devices", () => {
      mockPointer({ canHover: false });
      renderGraph();
      fireEvent.mouseEnter(userModeling());
      expect(paperTwo()).not.toHaveClass("is-dimmed");
    });

    it("releases the pin when the same topic is tapped again", () => {
      mockPointer({ canHover: false });
      renderGraph();
      fireEvent.click(userModeling());
      fireEvent.click(userModeling());
      expect(paperTwo()).not.toHaveClass("is-dimmed");
    });

    it("releases the pin on a tap on empty graph space", () => {
      mockPointer({ canHover: false });
      const { container } = render(
        <ResearchGraph
          publications={publications}
          topics={topics}
          onSelectPaper={jest.fn()}
        />,
      );
      fireEvent.click(userModeling());
      fireEvent.click(container.querySelector("svg"));
      expect(paperTwo()).not.toHaveClass("is-dimmed");
    });

    it("releases the pin on a tap outside the graph", () => {
      mockPointer({ canHover: false });
      renderGraph();
      fireEvent.click(userModeling());
      fireEvent.pointerDown(document.body);
      expect(paperTwo()).not.toHaveClass("is-dimmed");
    });

    it("releases the pin on Escape", () => {
      mockPointer({ canHover: false });
      renderGraph();
      fireEvent.click(userModeling());
      fireEvent.keyDown(document, { key: "Escape" });
      expect(paperTwo()).not.toHaveClass("is-dimmed");
    });
  });
});
