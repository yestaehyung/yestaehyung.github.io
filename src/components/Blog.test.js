import { render, screen, within } from "@testing-library/react";

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
      motivation:
        "현재 LLM 연구는 **선호의 일관성(preference consistency)**과 **행동적 결과(behavioral consequences)**를 분리하며 다룬다.",
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
    expect(getBalancedLines).toHaveBeenCalledWith(
      "Maximizing mutual information between user-contexts and responses improves LLM personalization with no additional data",
      expect.objectContaining({
        maxWidth: expect.any(Number),
        font: '600 16px "SUIT"',
        lineHeight: 22,
      })
    );
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

  test("does not render extra rhythm callouts in the paper notebook preview", async () => {
    mockParams = { postId: "test-post" };

    render(
      <MemoryRouter initialEntries={["/blog/test-post"]}>
        <Routes>
          <Route path="/blog/:postId" element={<Blog />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText("Maximizing mutual information");

    expect(screen.queryAllByTestId("blog-rhythm-block")).toHaveLength(0);
    expect(screen.getByText("Background sentence.")).toBeInTheDocument();
    expect(screen.getByText("Results sentence.")).toBeInTheDocument();
    expect(screen.queryByText("Key Line")).not.toBeInTheDocument();
    expect(screen.queryByText("Spotlight")).not.toBeInTheDocument();
  });

  test("renders compact Korean toc labels on the detail page", async () => {
    mockParams = { postId: "test-post" };

    render(
      <MemoryRouter initialEntries={["/blog/test-post"]}>
        <Routes>
          <Route path="/blog/:postId" element={<Blog />} />
        </Routes>
      </MemoryRouter>
    );

    const toc = await screen.findByRole("navigation", { name: /table of contents/i });
    expect(within(toc).getByText("연구 배경")).toBeInTheDocument();
    expect(within(toc).getByText("연구 동기")).toBeInTheDocument();
    expect(within(toc).getByText("결과")).toBeInTheDocument();
    expect(within(toc).queryByText(/Research Background/i)).not.toBeInTheDocument();
  });

  test("renders a lead preview summary on the blog list cards", async () => {
    render(
      <MemoryRouter initialEntries={["/blog"]}>
        <Routes>
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText(
        "현재 LLM 연구는 선호의 일관성(preference consistency)과 행동적 결과(behavioral consequences)를 분리하며 다룬다."
      )
    ).toBeInTheDocument();
    expect(screen.queryByText(/\*\*/)).not.toBeInTheDocument();
  });

  test("limits pretext to titles while keeping supporting copy plain", async () => {
    mockParams = { postId: "test-post" };

    render(
      <MemoryRouter initialEntries={["/blog/test-post"]}>
        <Routes>
          <Route path="/blog/:postId" element={<Blog />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText("Maximizing mutual information");

    expect(getBalancedLines).toHaveBeenCalledWith(
      "Maximizing mutual information between user-contexts and responses improves LLM personalization with no additional data",
      expect.objectContaining({
        maxWidth: expect.any(Number),
        font: '700 32px "SUIT"',
        lineHeight: 44,
      })
    );

    expect(screen.getByTestId("blog-lead-summary")).toBeInTheDocument();
    expect(
      screen.getAllByText(
        "현재 LLM 연구는 선호의 일관성(preference consistency)과 행동적 결과(behavioral consequences)를 분리하며 다룬다."
      ).length
    ).toBeGreaterThan(0);
    expect(screen.getByText("연구 배경 (Research Background)")).toBeInTheDocument();

    expect(getBalancedLines).not.toHaveBeenCalledWith(
      "연구 배경 (Research Background)",
      expect.anything()
    );
    expect(getBalancedLines).not.toHaveBeenCalledWith(
      "현재 LLM 연구는 선호의 일관성(preference consistency)과 행동적 결과(behavioral consequences)를 분리하며 다룬다.",
      expect.anything()
    );
  });
});
