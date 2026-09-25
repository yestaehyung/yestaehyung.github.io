import { render, screen, fireEvent } from "@testing-library/react";
import Publications, { publicationAnchorId } from "./Publications";

describe("Publications focus from the research graph", () => {
  it("highlights the requested paper", () => {
    const { container } = render(<Publications focusRequest={{ id: 10 }} />);
    expect(container.querySelector(`#${publicationAnchorId(10)}`)).toHaveClass(
      "is-highlighted",
    );
  });

  it("clears a filter that would hide the requested paper", () => {
    const { container, rerender } = render(<Publications />);
    fireEvent.click(screen.getByRole("button", { name: "Journal" }));
    expect(container.querySelector(`#${publicationAnchorId(10)}`)).toBeNull();

    rerender(<Publications focusRequest={{ id: 10 }} />);
    expect(
      container.querySelector(`#${publicationAnchorId(10)}`),
    ).not.toBeNull();
  });
});
