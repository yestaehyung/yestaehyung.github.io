import { render, screen } from "@testing-library/react";

let mockParams = {};

jest.mock(
  "react-router-dom",
  () => {
    const React = require("react");

    return {
      MemoryRouter: ({ children }) => <>{children}</>,
      Routes: ({ children }) => <>{children}</>,
      Route: ({ element }) => element,
      Link: ({ to, children, ...props }) => (
        <a href={to} {...props}>
          {children}
        </a>
      ),
      useParams: () => mockParams,
    };
  },
  { virtual: true }
);

jest.mock("./PaperGraph", () => () => <div data-testid="paper-graph" />);

jest.mock("../lib/pretextLayout", () => ({
  getBalancedLines: jest.fn(),
}));

import { MemoryRouter, Route, Routes } from "react-router-dom";
import { getBalancedLines } from "../lib/pretextLayout";
import Blog from "./Blog";

const posts = [
  {
    id: "test-post",
    title:
      "Maximizing mutual information between user-contexts and responses improves LLM personalization with no additional data",
    date: "2026-03-26",
    author: "OpenClaw's Agent",
    venue: "ICML 2026 / arXiv 2603.19294",
    tags: ["LLM Personalization", "Preference Learning"],
    thumbnail: null,
    sections: {
      background: "Background sentence.",
      motivation: "Motivation sentence.",
      results: "Results sentence.",
    },
  },
];

describe("Blog", () => {
  beforeEach(() => {
    mockParams = {};
    global.IntersectionObserver = class {
      observe() {}
      disconnect() {}
      unobserve() {}
    };
    getBalancedLines.mockImplementation((text) => {
      if (
        text ===
        "Maximizing mutual information between user-contexts and responses improves LLM personalization with no additional data"
      ) {
        return [
          "Maximizing mutual information",
          "between user-contexts and responses",
        ];
      }

      return [text];
    });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(posts),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders a balanced blog list title", async () => {
    render(
      <MemoryRouter initialEntries={["/blog"]}>
        <Routes>
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Maximizing mutual information")).toBeInTheDocument();
    expect(
      screen.getByText("between user-contexts and responses")
    ).toBeInTheDocument();
  });

  test("renders a blog detail hero with lead summary", async () => {
    mockParams = { postId: "test-post" };

    render(
      <MemoryRouter initialEntries={["/blog/test-post"]}>
        <Routes>
          <Route path="/blog/:postId" element={<Blog />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Maximizing mutual information")).toBeInTheDocument();
    expect(screen.getByText("Reviewed by OpenClaw's Agent")).toBeInTheDocument();
    expect(screen.getByTestId("blog-lead-summary")).toBeInTheDocument();
  });

  test("renders rhythm blocks only for selected sections", async () => {
    mockParams = { postId: "test-post" };

    render(
      <MemoryRouter initialEntries={["/blog/test-post"]}>
        <Routes>
          <Route path="/blog/:postId" element={<Blog />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findAllByTestId("blog-rhythm-block")).toHaveLength(2);
    expect(screen.getByText("Background sentence.")).toBeInTheDocument();
    expect(screen.getByText("Results sentence.")).toBeInTheDocument();
  });
});
