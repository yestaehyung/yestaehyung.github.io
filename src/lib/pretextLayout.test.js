import { getBalancedLines } from "./pretextLayout";

jest.mock("@chenglou/pretext", () => ({
  prepareWithSegments: jest.fn(() => ({ prepared: true })),
  layoutWithLines: jest.fn(() => ({
    lines: [{ text: "alpha beta" }, { text: "gamma" }],
    lineCount: 2,
    height: 48,
  })),
}), { virtual: true });

describe("getBalancedLines", () => {
  test("returns balanced lines from pretext", () => {
    expect(getBalancedLines("alpha beta gamma", { maxWidth: 220 })).toEqual([
      "alpha beta",
      "gamma",
    ]);
  });

  test("falls back to a single line when layout input is invalid", () => {
    expect(getBalancedLines("", { maxWidth: 220 })).toEqual([""]);
  });
});
