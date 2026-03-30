import { render } from "@testing-library/react";
import PretextBalancedText from "./PretextBalancedText";
import { getBalancedLines } from "../lib/pretextLayout";

jest.mock("../lib/pretextLayout", () => ({
  getBalancedLines: jest.fn(() => ["alpha beta", "gamma"]),
}));

describe("PretextBalancedText", () => {
  beforeEach(() => {
    getBalancedLines.mockReturnValue(["alpha beta", "gamma"]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("forwards full layout options to pretext", () => {
    const prepareOptions = { preserveWhitespace: true };

    render(
      <PretextBalancedText
        as="p"
        text="alpha beta gamma"
        maxWidth={280}
        lineHeight={24}
        font='700 18px "SUIT"'
        prepareOptions={prepareOptions}
      />
    );

    expect(getBalancedLines).toHaveBeenCalledWith("alpha beta gamma", {
      maxWidth: 280,
      lineHeight: 24,
      font: '700 18px "SUIT"',
      prepareOptions,
    });
  });
});
